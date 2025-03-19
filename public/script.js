// Constants
const API_BASE_URL = '/api'; // Local server endpoint
const DEFAULT_PASSWORD = "D1gnityHere*";

// Country enum with names (from Country.cs and CountryExtensions.cs)
const countries = {
  'DE': 'Germany',
  'GB': 'United Kingdom',
  'US': 'United States',
  'ES': 'Spain',
  'FR': 'France',
  'IT': 'Italy',
  'NL': 'Netherlands',
  'BR': 'Brazil',
  'CA': 'Canada',
  'MX': 'Mexico',
  'AR': 'Argentina',
  'AU': 'Australia',
  'AT': 'Austria',
  'BE': 'Belgium',
  'CO': 'Colombia',
  'HK': 'Hong Kong',
  'SG': 'Singapore',
  'CN': 'China',
  'CH': 'Switzerland',
  // New countries (WIP)
  'JP': 'Japan (WIP)',
  'KR': 'South Korea (WIP)',
  'RU': 'Russia (WIP)',
  'ZA': 'South Africa (WIP)',
  'IN': 'India (WIP)',
  'PL': 'Poland (WIP)',
  'SE': 'Sweden (WIP)',
  'NO': 'Norway (WIP)',
  'DK': 'Denmark (WIP)',
  'FI': 'Finland (WIP)',
  'PT': 'Portugal (WIP)',
  'GR': 'Greece (WIP)',
  'TR': 'Turkey (WIP)',
  'IE': 'Ireland (WIP)',
  'NZ': 'New Zealand (WIP)',
  'CL': 'Chile (WIP)',
  'PE': 'Peru (WIP)',
  'UA': 'Ukraine (WIP)',
  'TH': 'Thailand (WIP)',
  'VN': 'Vietnam (WIP)'
};

// Legal Optins Keys (from CountryExtensions.cs)
const legalOptinsKeys = {
  'DE': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4yIiwibHRvdSI6ImRlLURFIiwibHBwIjoiZGUtREUifQ',
  'GB': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUdCIiwibHBwIjoiZW4tR0IifQ',
  'US': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLVVTIiwibHBwIjoiZW4tVVMifQ',
  'ES': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVzLUVTIiwibHBwIjoiZXMtRVMifQ',
  'FR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImZyLUZSIiwibHBwIjoiZnItRlIifQ',
  'IT': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6Iml0LUlUIiwibHBwIjoiaXQtSVQifQ',
  'NL': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6Im5sLU5MIiwibHBwIjoibmwtTkwifQ',
  'BR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiMy4yIiwibHRvdSI6InB0LUJSIiwibHBwIjoicHQtQlIifQ',
  'CA': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUNBIiwibHBwIjoiZW4tQ0EifQ',
  'MX': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6ImVzLUlOVEwiLCJscHAiOiJlcy1JTlRMIn0',
  'AR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6ImVzLUlOVEwiLCJscHAiOiJlcy1JTlRMIn0',
  'AU': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0',
  'AT': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4yIiwibHRvdSI6ImRlLURFIiwibHBwIjoiZGUtREUifQ',
  'BE': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImZyLUZSIiwibHBwIjoiZnItRlIifQ',
  'CO': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6ImVzLUlOVEwiLCJscHAiOiJlcy1JTlRMIn0',
  'HK': 'eyJ2dG91IjoiMi4wIiwidnBwIjoiNC4xIiwibHRvdSI6InpoLUhLIiwibHBwIjoiZW4tSU5UTCJ9',
  'SG': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0',
  'CN': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6InpoLUNOIiwibHBwIjoiemgtQ04ifQ',
  'CH': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImZyLUZSIiwibHBwIjoiZnItRlIifQ',
  
  // New countries - WIP using most fitting Legal-Key based on language/region
  'JP': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'KR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'RU': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'ZA': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'IN': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'PL': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'SE': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'NO': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'DK': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'FI': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'PT': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiMy4yIiwibHRvdSI6InB0LUJSIiwibHBwIjoicHQtQlIifQ', // Portuguese (BR key)
  'GR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'TR': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'IE': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUdCIiwibHBwIjoiZW4tR0IifQ', // UK English key
  'NZ': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'CL': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6ImVzLUlOVEwiLCJscHAiOiJlcy1JTlRMIn0', // International Spanish key
  'PE': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4wIiwibHRvdSI6ImVzLUlOVEwiLCJscHAiOiJlcy1JTlRMIn0', // International Spanish key
  'UA': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'TH': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0', // International English key
  'VN': 'eyJ2dG91IjoiNC4wIiwidnBwIjoiNC4xIiwibHRvdSI6ImVuLUlOVEwiLCJscHAiOiJlbi1JTlRMIn0'  // International English key
};

// API Functions
async function loadAccounts() {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    if (!response.ok) {
      throw new Error('Error loading accounts');
    }
    const accounts = await response.json();
    
    // Update table
    const tbody = document.querySelector('#accountsTable tbody');
    tbody.innerHTML = '';
    
    // Also update account selection for IP-Location
    const accountSelect = document.getElementById('accountSelect');
    // Delete all options except the first one
    while (accountSelect.options.length > 1) {
      accountSelect.remove(1);
    }
    
    if (accounts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">No accounts available</td></tr>';
    } else {
      accounts.forEach(account => {
        tbody.innerHTML += `
          <tr>
            <td>${account.username || '-'}</td>
            <td>${account.email || '-'}</td>
            <td>${account.password || '-'}</td>
            <td>${account.country || account.countryCode || '-'}</td>
          </tr>
        `;
        
        // Add to selection
        const option = document.createElement('option');
        option.value = account.email;
        option.textContent = `${account.username} (${account.email})`;
        accountSelect.appendChild(option);
      });
    }
    
    // Also update the support account selectors
    updateSupportAccountSelectors();
    
    return accounts;
  } catch (error) {
    console.error('Error loading accounts:', error);
    alert('Error loading accounts: ' + error.message);
    return [];
  }
}

async function createAccount(mailInput, country) {
  try {
    const response = await fetch(`${API_BASE_URL}/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mailInput,
        country,
        legalOptinsKey: legalOptinsKeys[country]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error creating account');
    }
    
    const account = await response.json();
    await loadAccounts(); // Reload accounts
    return account;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

async function getIpLocation(ipAddress, email = null, password = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-ip-location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ipAddress,
        email,
        password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error querying IP location');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error querying IP location:', error);
    throw error;
  }
}

async function clearAccounts() {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Error deleting accounts');
    }
    
    await loadAccounts(); // Reload accounts
  } catch (error) {
    console.error('Error deleting accounts:', error);
    alert('Error deleting accounts: ' + error.message);
  }
}

// Support Functions
// Support case creation
async function createSupportCase(email, password, subject, description, product, category) {
  try {
    const response = await fetch(`${API_BASE_URL}/create-support-case`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        subject,
        description,
        product,
        category
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error creating support case');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating support case:', error);
    throw error;
  }
}

// Load support cases
async function loadSupportCases() {
  try {
    const response = await fetch(`${API_BASE_URL}/support-cases`);
    if (!response.ok) {
      throw new Error('Error loading support cases');
    }
    return response.json();
  } catch (error) {
    console.error('Error loading support cases:', error);
    throw error;
  }
}

// Load support case details
async function loadSupportCaseDetails(caseId, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/support-cases/${caseId}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    if (!response.ok) {
      throw new Error('Error loading support case details');
    }
    return response.json();
  } catch (error) {
    console.error('Error loading support case details:', error);
    throw error;
  }
}

// Add comment to a support case
async function addCommentToCase(caseId, email, password, comment) {
  try {
    const response = await fetch(`${API_BASE_URL}/support-cases/${caseId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        comment
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error adding comment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

// Close support case
async function closeSupportCase(caseId, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/support-cases/${caseId}/close`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error closing support case');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error closing support case:', error);
    throw error;
  }
}

// Update support account selectors
function updateSupportAccountSelectors() {
  const supportAccounts = document.querySelectorAll('#supportAccount, #addCommentAccount');
  
  fetch(`${API_BASE_URL}/accounts`)
    .then(response => response.json())
    .then(accounts => {
      supportAccounts.forEach(selector => {
        // Save current value
        const currentValue = selector.value;
        
        // Remove all options except the first one
        while (selector.options.length > 1) {
          selector.remove(1);
        }
        
        if (accounts.length === 0) {
          return;
        }
        
        accounts.forEach(account => {
          const option = document.createElement('option');
          option.value = account.email;
          option.setAttribute('data-password', account.password);
          option.textContent = `${account.username} (${account.email})`;
          selector.appendChild(option);
        });
        
        // Restore previous value if available
        if (currentValue) {
          for (let i = 0; i < selector.options.length; i++) {
            if (selector.options[i].value === currentValue) {
              selector.selectedIndex = i;
              break;
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error updating support account selectors:', error);
    });
}

// Display support cases in table
function displaySupportCases(cases) {
  const tbody = document.querySelector('#casesTable tbody');
  const noCasesMessage = document.getElementById('noCasesMessage');
  
  tbody.innerHTML = '';
  
  if (cases.length === 0) {
    noCasesMessage.style.display = 'block';
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No support cases available</td></tr>';
    return;
  }
  
  noCasesMessage.style.display = 'none';
  
  cases.forEach(caseItem => {
    const tr = document.createElement('tr');
    const createdDate = new Date(caseItem.createdAt).toLocaleString();
    
    // Status badge color
    let statusBadgeClass = 'bg-secondary';
    if (caseItem.status === 'open') statusBadgeClass = 'bg-success';
    else if (caseItem.status === 'pending') statusBadgeClass = 'bg-warning';
    else if (caseItem.status === 'closed') statusBadgeClass = 'bg-danger';
    
    tr.innerHTML = `
      <td>${caseItem.id}</td>
      <td>${caseItem.subject}</td>
      <td>${caseItem.category}</td>
      <td><span class="badge ${statusBadgeClass}">${caseItem.status}</span></td>
      <td>${createdDate}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary view-case" data-case-id="${caseItem.id}" data-email="${caseItem.email}">
          Details
        </button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
  
  // Add event listeners for detail buttons
  document.querySelectorAll('.view-case').forEach(button => {
    button.addEventListener('click', function() {
      const caseId = this.getAttribute('data-case-id');
      const email = this.getAttribute('data-email');
      showCaseDetails(caseId, email);
    });
  });
}

// Show support case details
function showCaseDetails(caseId, userEmail) {
  // Activate tab
  document.getElementById('case-details-tab').style.display = 'block';
  document.getElementById('case-details-tab').click();
  
  // Set account selector accordingly
  const commentAccountSelector = document.getElementById('addCommentAccount');
  for (let i = 0; i < commentAccountSelector.options.length; i++) {
    if (commentAccountSelector.options[i].value === userEmail) {
      commentAccountSelector.selectedIndex = i;
      break;
    }
  }
  
  document.getElementById('commentCaseId').value = caseId;
  document.getElementById('caseDetailsContent').style.display = 'none';
  document.getElementById('caseDetailsLoading').style.display = 'inline-block';
  
  // Extract account password from selector
  const selectedOption = commentAccountSelector.options[commentAccountSelector.selectedIndex];
  const password = selectedOption.getAttribute('data-password');
  
  loadSupportCaseDetails(caseId, userEmail, password)
    .then(caseDetails => {
      // Basic information
      document.getElementById('detailCaseId').textContent = caseDetails.id;
      document.getElementById('detailSubject').textContent = caseDetails.subject;
      document.getElementById('detailDescription').textContent = caseDetails.description;
      document.getElementById('detailCreatedAt').textContent = new Date(caseDetails.createdAt).toLocaleString();
      document.getElementById('detailCategory').textContent = caseDetails.category;
      document.getElementById('detailProduct').textContent = caseDetails.product;
      
      // Status badge
      const statusElement = document.getElementById('detailStatus');
      statusElement.textContent = caseDetails.status;
      statusElement.className = 'badge';
      
      if (caseDetails.status === 'open') statusElement.classList.add('bg-success');
      else if (caseDetails.status === 'pending') statusElement.classList.add('bg-warning');
      else if (caseDetails.status === 'closed') statusElement.classList.add('bg-danger');
      else statusElement.classList.add('bg-secondary');
      
      // Comments
      const commentsContainer = document.getElementById('commentsContainer');
      const noCommentsMessage = document.getElementById('noCommentsMessage');
      commentsContainer.innerHTML = '';
      
      if (caseDetails.comments && caseDetails.comments.length > 0) {
        noCommentsMessage.style.display = 'none';
        
        caseDetails.comments.forEach(comment => {
          const commentDate = new Date(comment.createdAt).toLocaleString();
          const commentDiv = document.createElement('div');
          commentDiv.className = 'card mb-2';
          commentDiv.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
              <small>${comment.author || 'Support'}</small>
              <small class="text-muted">${commentDate}</small>
            </div>
            <div class="card-body">
              <p class="card-text">${comment.text}</p>
            </div>
          `;
          commentsContainer.appendChild(commentDiv);
        });
      } else {
        noCommentsMessage.style.display = 'block';
      }
      
      // Show content, hide loading
      document.getElementById('caseDetailsContent').style.display = 'block';
      document.getElementById('caseDetailsLoading').style.display = 'none';
      
      // Disable controls if case is closed
      const addCommentForm = document.getElementById('addCommentForm');
      const closeCaseBtn = document.getElementById('closeCaseBtn');
      
      if (caseDetails.status === 'closed') {
        addCommentForm.querySelectorAll('input, textarea, button').forEach(el => {
          el.disabled = true;
        });
        closeCaseBtn.style.display = 'none';
      } else {
        addCommentForm.querySelectorAll('input, textarea, button').forEach(el => {
          el.disabled = false;
        });
        closeCaseBtn.style.display = 'inline-block';
      }
    })
    .catch(error => {
      alert('Error loading case details: ' + error.message);
      document.getElementById('caseDetailsLoading').style.display = 'none';
      document.getElementById('view-cases-tab').click();
    });
}

// Event listeners and UI updates
document.addEventListener('DOMContentLoaded', function() {
  // Fill country list
  const countrySelect = document.getElementById('country');
  Object.entries(countries).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = `${name} (${code})`;
    countrySelect.appendChild(option);
  });
  
  // Fill countries list on Countries page
  const countriesList = document.getElementById('countriesList');
  Object.entries(countries).forEach(([code, name]) => {
    const countryDiv = document.createElement('div');
    countryDiv.className = 'col-md-6 mb-2';
    countryDiv.innerHTML = `
      <div class="card">
        <div class="card-body py-2">
          <strong>${code}</strong> - ${name}
        </div>
      </div>
    `;
    countriesList.appendChild(countryDiv);
  });
  
  // Load accounts
  loadAccounts();
  
  // Account creation form
  document.getElementById('claimForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const mailInput = document.getElementById('mailProvider').value;
    const country = document.getElementById('country').value;
    
    document.getElementById('claimLoading').style.display = 'inline-block';
    document.getElementById('claimResult').style.display = 'none';
    
    try {
      const account = await createAccount(mailInput, country);
      document.getElementById('claimOutput').textContent = JSON.stringify(account, null, 2);
      document.getElementById('claimResult').style.display = 'block';
    } catch (error) {
      document.getElementById('claimOutput').textContent = `Error: ${error.message}`;
      document.getElementById('claimResult').style.display = 'block';
    } finally {
      document.getElementById('claimLoading').style.display = 'none';
    }
  });
  
  // IP Location form
  document.getElementById('locationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const ipAddress = document.getElementById('ipAddress').value;
    const selectedEmail = document.getElementById('accountSelect').value;
    
    document.getElementById('locationLoading').style.display = 'inline-block';
    document.getElementById('locationResult').style.display = 'none';
    
    try {
      let locationData;
      
      if (selectedEmail) {
        // With account authentication
        const accounts = await fetch(`${API_BASE_URL}/accounts`).then(res => res.json());
        const account = accounts.find(a => a.email === selectedEmail);
        
        if (!account) {
          throw new Error('Account not found');
        }
        
        locationData = await getIpLocation(ipAddress, account.email, account.password);
      } else {
        // Without account authentication
        locationData = await getIpLocation(ipAddress);
      }
      
      document.getElementById('locationOutput').textContent = JSON.stringify(locationData, null, 2);
      document.getElementById('locationResult').style.display = 'block';
    } catch (error) {
      document.getElementById('locationOutput').textContent = `Error: ${error.message}`;
      document.getElementById('locationResult').style.display = 'block';
    } finally {
      document.getElementById('locationLoading').style.display = 'none';
    }
  });
  
  // Delete accounts
  // Delete accounts
document.getElementById('clearAccounts').addEventListener('click', async function() {
  if (confirm('Are you sure you want to delete all accounts? This cannot be undone.')) {
      await clearAccounts();
  }
});

// Support case management
document.getElementById('supportForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const accountSelect = document.getElementById('supportAccount');
  const email = accountSelect.value;
  if (!email) {
      alert('Please select an account first.');
      return;
  }
  
  const selectedOption = accountSelect.options[accountSelect.selectedIndex];
  const password = selectedOption.getAttribute('data-password');
  
  const subject = document.getElementById('caseSubject').value;
  const description = document.getElementById('caseDescription').value;
  const product = document.getElementById('caseProduct').value;
  const category = document.getElementById('caseCategory').value;
  
  document.getElementById('supportLoading').style.display = 'inline-block';
  
  try {
      const result = await createSupportCase(email, password, subject, description, product, category);
      alert('Support case created successfully: ' + result.id);
      
      // Reset form
      document.getElementById('supportForm').reset();
      
      // Refresh cases
      loadSupportCases()
          .then(cases => {
              displaySupportCases(cases);
          });
          
  } catch (error) {
      alert('Error creating support case: ' + error.message);
  } finally {
      document.getElementById('supportLoading').style.display = 'none';
  }
});

// Load support cases button
document.getElementById('loadCasesBtn').addEventListener('click', function() {
  document.getElementById('casesLoading').style.display = 'inline-block';
  
  loadSupportCases()
      .then(cases => {
          displaySupportCases(cases);
      })
      .catch(error => {
          alert('Error loading support cases: ' + error.message);
      })
      .finally(() => {
          document.getElementById('casesLoading').style.display = 'none';
      });
});

// Add comment form
document.getElementById('addCommentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const caseId = document.getElementById('commentCaseId').value;
  const commentText = document.getElementById('commentText').value;
  const accountSelect = document.getElementById('addCommentAccount');
  const email = accountSelect.value;
  
  if (!email) {
      alert('Please select an account first.');
      return;
  }
  
  const selectedOption = accountSelect.options[accountSelect.selectedIndex];
  const password = selectedOption.getAttribute('data-password');
  
  document.getElementById('commentLoading').style.display = 'inline-block';
  
  try {
      await addCommentToCase(caseId, email, password, commentText);
      
      // Reset form
      document.getElementById('commentText').value = '';
      
      // Refresh case details
      await showCaseDetails(caseId, email);
      
      alert('Comment added successfully');
  } catch (error) {
      alert('Error adding comment: ' + error.message);
  } finally {
      document.getElementById('commentLoading').style.display = 'none';
  }
});

// Close case button
document.getElementById('closeCaseBtn').addEventListener('click', async function() {
  if (!confirm('Are you sure you want to close this case?')) {
      return;
  }
  
  const caseId = document.getElementById('commentCaseId').value;
  const accountSelect = document.getElementById('addCommentAccount');
  const email = accountSelect.value;
  
  if (!email) {
      alert('Please select an account first.');
      return;
  }
  
  const selectedOption = accountSelect.options[accountSelect.selectedIndex];
  const password = selectedOption.getAttribute('data-password');
  
  document.getElementById('caseDetailsLoading').style.display = 'inline-block';
  document.getElementById('caseDetailsContent').style.display = 'none';
  
  try {
      await closeSupportCase(caseId, email, password);
      
      // Refresh case details
      await showCaseDetails(caseId, email);
      
      // Refresh cases list
      loadSupportCases()
          .then(cases => {
              displaySupportCases(cases);
          });
          
      alert('Case closed successfully');
  } catch (error) {
      alert('Error closing case: ' + error.message);
      document.getElementById('caseDetailsContent').style.display = 'block';
  } finally {
      document.getElementById('caseDetailsLoading').style.display = 'none';
  }
});

// Tab navigation events - handle showing/hiding appropriate content
document.querySelectorAll('.nav-link').forEach(tab => {
  tab.addEventListener('click', function() {
      // Hide case details tab by default when switching tabs
      if (this.id !== 'case-details-tab') {
          document.getElementById('case-details-tab').style.display = 'none';
      }
  });
});

// Initial load of support cases
loadSupportCases()
  .then(cases => {
      displaySupportCases(cases);
  })
  .catch(error => {
      console.error('Error loading initial support cases:', error);
  });

// Mass creation form
document.getElementById('massCreateForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const mailDomain = document.getElementById('massDomain').value;
  const country = document.getElementById('massCountry').value;
  const count = parseInt(document.getElementById('massCount').value);
  
  if (count <= 0 || count > 100) {
      alert('Please enter a valid number of accounts (1-100)');
      return;
  }
  
  document.getElementById('massLoading').style.display = 'inline-block';
  document.getElementById('massResult').style.display = 'none';
  
  try {
      const results = [];
      
      for (let i = 0; i < count; i++) {
          try {
              const randomString = Math.random().toString(36).substring(2, 8);
              const mailInput = `mass.${randomString}@${mailDomain}`;
              
              const account = await createAccount(mailInput, country);
              results.push(account);
              
              // Update progress
              document.getElementById('massProgress').textContent = `Created ${i+1}/${count} accounts...`;
          } catch (error) {
              console.error(`Error creating account ${i+1}:`, error);
              results.push({ error: error.message });
          }
      }
      
      document.getElementById('massOutput').textContent = JSON.stringify(results, null, 2);
      document.getElementById('massResult').style.display = 'block';
  } catch (error) {
      document.getElementById('massOutput').textContent = `Error: ${error.message}`;
      document.getElementById('massResult').style.display = 'block';
  } finally {
      document.getElementById('massLoading').style.display = 'none';
      document.getElementById('massProgress').textContent = '';
  }
});

// Export accounts to file
document.getElementById('exportAccountsBtn').addEventListener('click', async function() {
  try {
      const accounts = await fetch(`${API_BASE_URL}/accounts`).then(res => res.json());
      
      if (accounts.length === 0) {
          alert('No accounts to export');
          return;
      }
      
      // Create a downloadable blob
      const accountsJson = JSON.stringify(accounts, null, 2);
      const blob = new Blob([accountsJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `ubisoft-accounts-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
      }, 100);
  } catch (error) {
      console.error('Error exporting accounts:', error);
      alert('Error exporting accounts: ' + error.message);
  }
});

// Import accounts from file
document.getElementById('importAccountsBtn').addEventListener('click', function() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json';
  
  fileInput.addEventListener('change', async function() {
      if (!this.files || this.files.length === 0) return;
      
      const file = this.files[0];
      const reader = new FileReader();
      
      reader.onload = async function(e) {
          try {
              const accounts = JSON.parse(e.target.result);
              
              if (!Array.isArray(accounts)) {
                  throw new Error('Invalid accounts format');
              }
              
              const response = await fetch(`${API_BASE_URL}/import-accounts`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ accounts })
              });
              
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || 'Error importing accounts');
              }
              
              await loadAccounts(); // Reload accounts
              alert(`Successfully imported ${accounts.length} accounts`);
          } catch (error) {
              console.error('Error importing accounts:', error);
              alert('Error importing accounts: ' + error.message);
          }
      };
      
      reader.readAsText(file);
  });
  
  fileInput.click();
});

// Initialize tooltips and other Bootstrap components
if (typeof bootstrap !== 'undefined') {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Check server status on page load
async function checkServerStatus() {
  try {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (response.ok) {
          document.getElementById('serverStatus').textContent = 'Connected';
          document.getElementById('serverStatus').className = 'badge bg-success';
      } else {
          document.getElementById('serverStatus').textContent = 'Error';
          document.getElementById('serverStatus').className = 'badge bg-danger';
      }
  } catch (error) {
      document.getElementById('serverStatus').textContent = 'Disconnected';
      document.getElementById('serverStatus').className = 'badge bg-danger';
  }
}

// Check server status periodically
checkServerStatus();
setInterval(checkServerStatus, 30000); // Check every 30 seconds