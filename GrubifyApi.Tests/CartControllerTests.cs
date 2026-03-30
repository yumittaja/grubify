using System.Net;
using System.Net.Http.Json;
using GrubifyApi.Controllers;
using GrubifyApi.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace GrubifyApi.Tests
{
    public class CartControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private const long MaxExpectedMemoryGrowthMb = 50;

        public CartControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task AddItemToCart_ReturnsOk()
        {
            var request = new AddCartItemRequest { FoodItemId = 1, Quantity = 2 };
            var response = await _client.PostAsJsonAsync("/api/cart/user1/items", request);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task AddItemToCart_ManyRequests_DoesNotAccumulateLargeMemory()
        {
            // Record memory before making repeated requests
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();
            long memoryBefore = GC.GetTotalMemory(true);

            var request = new AddCartItemRequest { FoodItemId = 1, Quantity = 1 };
            for (int i = 0; i < 20; i++)
            {
                var response = await _client.PostAsJsonAsync("/api/cart/memtest/items", request);
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }

            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();
            long memoryAfter = GC.GetTotalMemory(true);

            // 20 requests should not accumulate 200MB+ (which the old 10MB-per-request code would cause)
            long memoryGrowthMb = (memoryAfter - memoryBefore) / (1024 * 1024);
            Assert.True(memoryGrowthMb < MaxExpectedMemoryGrowthMb,
                $"Memory grew by {memoryGrowthMb}MB across 20 add-to-cart requests; expected less than {MaxExpectedMemoryGrowthMb}MB.");
        }

        [Fact]
        public async Task AddItemToCart_SameItem_IncrementsQuantity()
        {
            var userId = "user-qty-test";
            var request = new AddCartItemRequest { FoodItemId = 2, Quantity = 1 };

            await _client.PostAsJsonAsync($"/api/cart/{userId}/items", request);
            var response = await _client.PostAsJsonAsync($"/api/cart/{userId}/items", request);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var cart = await response.Content.ReadFromJsonAsync<Cart>();
            Assert.NotNull(cart);
            var item = cart.Items.FirstOrDefault(i => i.FoodItemId == 2);
            Assert.NotNull(item);
            Assert.Equal(2, item.Quantity);
        }

        [Fact]
        public async Task GetCart_NewUser_ReturnsEmptyCart()
        {
            var response = await _client.GetAsync("/api/cart/newuser-xyz");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var cart = await response.Content.ReadFromJsonAsync<Cart>();
            Assert.NotNull(cart);
            Assert.Empty(cart.Items);
        }
    }
}
