document.addEventListener('DOMContentLoaded', () => {

    const cities = ["London", "Dubai", "Islamabad", "New York", "Tokyo"];
    const industries = ["Aerospace Engineering", "AI Development", "Digital Architecture", "Surgical Consultancy", "Luxury Brand Marketing"];
    const expLevels = ["Executive", "Senior", "Director"];

    const namesByCity = {
      "London": ["James Sterling", "Eleanor Vance", "Arthur Pendelton", "Sophia Kensington", "Oliver Thorne", "Charlotte Blackwood", "William Ashford", "Amelia Croft", "Henry Windsor", "Victoria Hale"],
      "Dubai": ["Omar Al-Fayed", "Layla Mansour", "Tariq Rahman", "Zahra Al-Maktoum", "Karim Hassan", "Fatima Saeed", "Yousef Ali", "Aisha Gulf", "Khalid Mahmud", "Noura Al-Ahmadi"],
      "Islamabad": ["Zainab Tariq", "Faisal Qureshi", "Amina Khan", "Bilal Ahmed", "Sadia Malik", "Usman Sheikh", "Hina Rabbani", "Salman Ali", "Nida Yasir", "Kamran Akmal"],
      "New York": ["Michael Chang", "Sarah Jenkins", "David Martinez", "Emily Chen", "Robert Vance", "Jessica Stone", "William Turner", "Ashley Gomez", "Matthew Clark", "Amanda Wright"],
      "Tokyo": ["Kenji Tanaka", "Yui Sato", "Hiroshi Watanabe", "Mei Takahashi", "Takeshi Kobayashi", "Sakura Ito", "Ryota Yamamoto", "Hana Nakamura", "Daiki Matsumoto", "Yuki Saito"]
    };

    const subSkills = {
      "Aerospace Engineering": ["Orbital Mechanics", "Propulsion Systems", "Satellite Design", "Avionics", "Aerodynamics"],
      "AI Development": ["Neural Networks", "Computer Vision", "NLP", "Robotics", "Generative Models"],
      "Digital Architecture": ["BIM", "Parametric Design", "Urban Simulation", "Sustainable Tech", "VR Walkthroughs"],
      "Surgical Consultancy": ["Neuro-Robotics", "Cardiovascular Systems", "Minimally Invasive", "Tele-Surgery", "Precision Oncology"],
      "Luxury Brand Marketing": ["High-End Retail", "Brand Strategy", "Digital Experiences", "Clientele Relations", "Global Campaigns"]
    };

    let profiles = [];
    let counter = 1;

    // Generate exactly 50 profiles (5 cities * 10 names)
    cities.forEach(city => {
        namesByCity[city].forEach((name, idx) => {
            const indIndex = (counter) % 5;
            const industry = industries[indIndex];
            const skill = subSkills[industry][idx % 5];
            const rating = (4.7 + (idx % 4) * 0.1).toFixed(1); // 4.7, 4.8, 4.9, 5.0
            const expLevel = expLevels[idx % 3];

            profiles.push({
                id: counter,
                name: name,
                city: city,
                industry: industry,
                powerSkill: skill,
                rating: rating,
                experience: expLevel,
                image: `https://i.pravatar.cc/300?u=${name.replace(/\s+/g, '')}${counter}`,
                bio: `${name} is a highly accomplished professional in the field of ${industry}, based in the thriving hub of ${city}. With over a decade of elite experience, they specialize deeply in ${skill}, consistently delivering transformative results and driving global innovation. Verified by TalentNexus AI mapping.`,
                projects: [
                    `${city} Initiative A`,
                    `Global ${skill} Deployment`,
                    `${industry} Strategic Growth`
                ]
            });
            counter++;
        });
    });

    // Populate Filters
    const indFilter = document.getElementById('filter-industry');
    const locFilter = document.getElementById('filter-country');

    industries.forEach(ind => {
        const opt = document.createElement('option');
        opt.value = ind;
        opt.textContent = ind;
        indFilter.appendChild(opt);
    });

    cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        locFilter.appendChild(opt);
    });

    // Elements
    const gridContainer = document.getElementById('grid-container');
    const loadingState = document.getElementById('loading-state');

    // Rendering Logic
    function renderCards(data) {
        gridContainer.innerHTML = '';
        data.forEach((p, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
                <div class="card-body">
                    <h3 class="card-name">${p.name} <i class="fa-solid fa-circle-check blue-tick"></i></h3>
                    <p class="card-skill">${p.powerSkill} | ${p.industry}</p>
                    <div class="card-rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span>${p.rating}</span>
                    </div>
                </div>
            `;
            // Add click listener
            card.addEventListener('click', () => openModal(p));
            gridContainer.appendChild(card);
        });

        // Re-attach observers to new cards
        observeCards();
    }

    // Filter Logic
    function applyFilters() {
        const searchQ = document.getElementById('global-search').value.toLowerCase();
        const indQ = indFilter.value;
        const locQ = locFilter.value;
        const expQ = document.getElementById('filter-experience').value;

        const filtered = profiles.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(searchQ) || p.powerSkill.toLowerCase().includes(searchQ);
            const matchInd = indQ === 'all' || p.industry === indQ;
            const matchLoc = locQ === 'all' || p.city === locQ;
            const matchExp = expQ === 'all' || p.experience === expQ;
            return matchSearch && matchInd && matchLoc && matchExp;
        });

        renderCards(filtered);
    }

    document.getElementById('global-search').addEventListener('input', applyFilters);
    indFilter.addEventListener('change', applyFilters);
    locFilter.addEventListener('change', applyFilters);
    document.getElementById('filter-experience').addEventListener('change', applyFilters);

    // Initial Loading Simulation
    setTimeout(() => {
        loadingState.classList.add('hidden');
        gridContainer.classList.remove('hidden');
        renderCards(profiles);
    }, 1500);

    // Scroll Reveal Observer
    function observeCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => observer.observe(card));
    }

    // Modal Logic
    const modal = document.getElementById('profile-modal');
    const btnClose = document.getElementById('close-modal');

    function openModal(userData) {
        document.getElementById('modal-img').src = userData.image;
        document.getElementById('modal-name').innerHTML = `${userData.name} <i class="fa-solid fa-circle-check blue-tick"></i>`;
        document.getElementById('modal-power-skill').textContent = `${userData.powerSkill} | ${userData.industry} (${userData.city})`;
        document.getElementById('modal-bio').textContent = userData.bio;

        const pCont = document.getElementById('modal-projects');
        pCont.innerHTML = '';
        userData.projects.forEach(proj => {
            const div = document.createElement('div');
            div.className = 'project-placeholder';
            div.textContent = proj;
            pCont.appendChild(div);
        });

        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    btnClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
});
