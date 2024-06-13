document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    var jobList = document.getElementById('jobList');
    var jobDiv = document.createElement('div');

    var jobTitle = document.createElement('h3');
    jobTitle.textContent = title;

    var jobDescription = document.createElement('p');
    jobDescription.textContent = description;

    jobDiv.appendChild(jobTitle);
    jobDiv.appendChild(jobDescription);

    jobList.appendChild(jobDiv);

    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
});
