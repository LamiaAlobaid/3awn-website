    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve item count from localStorage
        var itemCountSpan = document.querySelector('.item-count');
        var currentItemCount = parseInt(localStorage.getItem('itemCount')) || 0;
        itemCountSpan.textContent = currentItemCount;

        var addToCartButtons = document.querySelectorAll('.addtocart');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                addToCart(this);
            });
        });
    });

    function addToCart(button) {
        var itemCountSpan = document.querySelector('.item-count');
        var currentItemCount = parseInt(itemCountSpan.textContent) || 0;
        var newItemCount = currentItemCount + 1;
        itemCountSpan.textContent = newItemCount;
        button.disabled = true; // Disable button after adding to cart

        // Store updated item count in localStorage
        localStorage.setItem('itemCount', newItemCount);
    }
    setTimeout(function() {
        localStorage.removeItem('itemCount');
    }, 10); // 24 * 60 * 60 * 1000 ==> 24 hours in milliseconds


   
