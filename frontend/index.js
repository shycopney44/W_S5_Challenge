async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

let mentors = [];
let learners = [];

const fetchMultipleData = async () => {
  const urls = [
    'http://localhost:3003/api/mentors',
    'http://localhost:3003/api/learners',
  ];

  try {
    const fetchPromises = urls.map(url => axios.get(url));
    const responses = await Promise.all(fetchPromises);

    mentors = responses[0].data;
    learners = responses[1].data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

await fetchMultipleData();

learners.forEach(learner => {
  console.log('Learner object:', learner);
  if (learner.mentors && Array.isArray(learner.mentors)) {
    learner.mentors.forEach(mentorId => {
      const mentor = mentors.find(m => m.id === mentorId);
      if (mentor) {
        const mentorName = `${mentor.firstName} ${mentor.lastName}`;
        console.log('Mentor name:', mentorName);
      } else {
        console.log(`Mentor with ID ${mentorId} not found`);
      }
    });
  } else {
    console.log('No mentors found for this learner');
  }
});

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  const combinedLearners = learners.map(learner => {
    const fullName = `${learner.firstName} ${learner.lastName}`;
    const mentorsNames = learner.mentors.map(mentorId => {
      const mentor = mentors.find(m => m.id === mentorId);
      return mentor ? `${mentor.firstName} ${mentor.lastName}` : null;
    }).filter(name => name !== null);

    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: mentorsNames,
    };
  });

  console.log(combinedLearners);
// //   // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
   const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of combinedLearners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')

    card.classList.add('card');
    heading.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorsHeading.classList.add('closed');
    mentorsHeading.textContent = 'Mentors';
    mentorsList.classList.add('mentors-list');
    mentorsList.style.display = 'none';

    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    });

    mentorsHeading.addEventListener('click', () => {
      if (mentorsList.style.display === 'none') {
        mentorsList.style.display = 'block';
        mentorsHeading.classList.remove('closed');
      } else {
        mentorsList.style.display = 'none';
        mentorsHeading.classList.add('closed');
      }
    });

    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
    cardsContainer.appendChild(card);

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
