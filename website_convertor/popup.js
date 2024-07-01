
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['N', 'actions'], (data) => {
    document.getElementById('narrative-container').textContent = `Calculated N: ${data.N}`;
    displayChart(data.actions);
  });
});

function displayChart(actions) {
  const ctx = document.getElementById('actionChart').getContext('2d');
  const actionTypes = actions.map(action => action.type);
  const actionCounts = {};
  
  actionTypes.forEach(type => {
    actionCounts[type] = (actionCounts[type] || 0) + 1;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(actionCounts),
      datasets: [{
        label: '# of Actions',
        data: Object.values(actionCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
