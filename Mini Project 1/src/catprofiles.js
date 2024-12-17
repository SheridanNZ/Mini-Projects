const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=24&api_key=live_3whYvIZes7ryabN71U114cV658iMNA9h2A8ejYPRr8jCmWzhotvIJbzsQS6Biw1v`; // TheCatAPI

// Arrays to randomly select/generate names, gender, age & locations for cat profile cards
const catNames = ['Whiskers', 'Shadow', 'Bella', 'Mittens', 'Simba', 'Luna', 'Oliver', 'Ajax', 'Tiger', 'Scout', 
  'Leo', 'Tom', 'Garfield', 'Sylvester', 'Summer', 'Ember', 'Suzy', 'Scratchy', 'Nala', 'Milo', 'Felix', 'Binx', 
  'Smokey-Jo', 'Salem', 'MooMoo', 'Bop', 'Fluffy', 'Lady', 'Lucky', 'Katniss', 'Bagheera', 'Diego', 'Meowth', 
  'Mr. Bigglesworth', 'Snowbell' ];
const catLocations = ['Auckland', 'Whangarei', 'Hamilton', 'Wellington', 'Christchurch', 'Queenstown', 'Dunedin', 'Blenheim'];
const genders = ['Male', 'Female'];
const minAge = 1;
const maxAge = 10;

// Store cats profiles for filtering later
const catProfiles = []; // each cat profile is object containing various propertiy such as name, age...

// Ensure the "Any Age" checkbox is checked by default when the page loads to avoid cat profiles not showing on load and for filtering
document.querySelector('input[name="age"][value="any"]').checked = true;

// Event listener for filter button (using querySelector instead of getElementById)
document.querySelector('.purple-btn').addEventListener('click', function () {  // on click of filter options
  const selectedGenderFilter = document.getElementById('genderFilter').value.toLowerCase(); // Ensure case-insensitivity
  const selectedLocationFilter = document.getElementById('locationFilter').value;
  const selectedAgeFilters = Array.from(document.querySelectorAll('input[name="age"]:checked')).map(checkbox => checkbox.value);
  /* retrieves selected values, catprofile.filter() function checks if each cat matches selected values and filter. 
  populateCatCards() will update the page with the cards that match the selected criteria */

  const filteredCats = catProfiles.filter(cat => {
    // Case-insensitive gender match
    const matchesGender = selectedGenderFilter === 'any' || cat.gender.toLowerCase() === selectedGenderFilter;

    // Location match
    const matchesLocation = selectedLocationFilter === 'any' || cat.location === selectedLocationFilter;

    const matchesAge = selectedAgeFilters.includes('any') || selectedAgeFilters.some(ageFilter => {
      if (ageFilter === '0-2') return cat.age >= 0 && cat.age <= 2;
      if (ageFilter === '3-4') return cat.age >= 3 && cat.age <= 4;
      if (ageFilter === '5-6') return cat.age >= 5 && cat.age <= 6;
      if (ageFilter === '7-8') return cat.age >= 7 && cat.age <= 8;
      if (ageFilter === '9-10+') return cat.age >= 9;
      return false;
    });
    
    return matchesGender && matchesLocation && matchesAge;
  });

  populateCatCards(filteredCats);
});

// Event listener for reset button (using querySelector instead of getElementById)
document.querySelector('.reset-btn').addEventListener('click', function () {
  // Reset filters to default values
  document.getElementById('genderFilter').value = 'any';
  document.getElementById('locationFilter').value = 'any';
  document.querySelectorAll('input[name="age"]').forEach(checkbox => checkbox.checked = false);

  // Ensure "Any Age" checkbox is checked after reset
  document.querySelector('input[name="age"][value="any"]').checked = true;

  // Reset displayed cats to show all
  populateCatCards(catProfiles);
});

// Function to get random item from array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate random age between min and max age
function getRandomAge() {
  return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}

// Fetch data from API & populate profiles
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Generate dynamic cat profiles from API data
    const cats = data.map(item => ({
      image: item.url, // Use each image URL directly to ensure no duplicate images
      name: getRandomItem(catNames),
      gender: getRandomItem(genders),
      age: getRandomAge(),
      location: getRandomItem(catLocations),
    }));
    
    catProfiles.push(...cats); // Store profiles for filtering
    populateCatCards(cats); // Populate the cat cards dynamically based on API data
  })
  .catch(error => console.error('Error fetching cat data:', error));

// Function to populate cat cards
function populateCatCards(cats) {
  const container = document.getElementById('catProfilesContainer');
  container.innerHTML = ''; 

  if (cats.length === 0) {
    container.innerHTML = '<p>No cats available for this filter criteria.</p>'; 
  } else {
    cats.forEach(cat => {
      const cardHTML = `
        <div class="col-md-3">
          <div class="card">
            <img src="${cat.image}" class="card-img-top" alt="${cat.name}">
            <div class="card-body">
              <h5 class="card-title">${cat.name}</h5>
              <p class="card-text">Age: ${cat.age}</p>
              <p class="card-text">Gender: ${cat.gender}</p>
              <p class="card-text">Location: ${cat.location}</p>
              <button class="btn btn-primary" onclick="showCatDetails(${JSON.stringify(cat)})">About Me</button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += cardHTML; // Append card to container
    });
  }
}

