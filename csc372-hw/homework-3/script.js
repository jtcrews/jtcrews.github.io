const gallery = document.querySelectorAll('img');

for (let index = 0; index < gallery.length; index++) {
  const element = gallery[index];
  element.addEventListener('click', expand);
}

function expand(event) {
  const smallImage = event.currentTarget;
  const bigImage = document.querySelector(".big");

  if (bigImage) {

    bigImage.classList.remove('big');
    bigImage.classList.add('small');
    const hiddenText = bigImage.nextElementSibling;
    if (hiddenText) hiddenText.style.display = 'none';
  }
  smallImage.classList.remove('small');
  smallImage.classList.add('big');
  const hiddenText = smallImage.nextElementSibling;
  if (hiddenText) hiddenText.style.display = 'block';
}

  const dishList = document.querySelectorAll('.add-btn');
  const mealPlanList = document.getElementById('meal-plan-list');
  const totalCostElement = document.getElementById('total-cost');
  let totalCost = 0;

  function updateTotalCost(amount) {
      totalCost += amount;
      totalCostElement.textContent = totalCost.toFixed(2);
  }

  function addDishToMealPlan(dishItem) {
      const listItem = dishItem.cloneNode(true);
      
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
          mealPlanList.removeChild(listItem);
          const cost = parseFloat(listItem.querySelector('.cost').textContent);
          updateTotalCost(-cost);
      });

      const addMoreBtn = document.createElement('button');
      addMoreBtn.textContent = 'Add More';
      addMoreBtn.addEventListener('click', () => {
          mealPlanList.appendChild(listItem.cloneNode(true)); 
          const cost = parseFloat(listItem.querySelector('.cost').textContent);
          updateTotalCost(cost);
      });

      listItem.appendChild(addMoreBtn);
      listItem.appendChild(removeBtn);
      mealPlanList.appendChild(listItem);

      const cost = parseFloat(listItem.querySelector('.cost').textContent);
      updateTotalCost(cost);
  }


  dishList.forEach(button => {
      button.addEventListener('click', () => {
          const dishItem = button.parentElement; 
          addDishToMealPlan(dishItem); 
      });
  });


