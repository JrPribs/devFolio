 // work
 // work contains an array of jobs. Each job object in jobs should contain an employer, title, location, dates worked and description.
 // projects
 // projects contains an array of projects. Each project object in projects should contain a title, dates worked, description, and an images array with URL strings for project images.
 // bio
 // bio contains a name, role, welcomeMessage, contacts object and skills array. The contacts object should contain (but doesn't have to) a mobile number, email address, github username, twitter handle and location.
 // education
 // education contains an array of schools. Each school object in schools contains a name, location, degree, majors array, dates attended and a url for the school's website. education also contains an onlineCourses array. Each onlineCourse object in onlineCourses should contain a title, school, dates attended and a url for the course.

var bio = {
    name: 'Jonathan Pribesh',
    role: 'Full-Stack Javascript Developer',
    contacts: {
        email: 'jpribes@wgu.edu',
        location: 'Fairfax, VA',
        mobile: '757-319-5689',
        github: 'JrPribs'
    },
    picUrl: 'img/me.jpg',
    welcomeMsg: 'Welcome to my resume',
    skills: ['Javascript', 'HTML5', 'CSS3', 'Sass', 'Bash']
};

var education = {
    schools: [{
        name: 'Western Governor\'s University',
        years: '2015 - 2019',
        location: 'Salt Lake City, UT',
        degree: 'BS',
        major: 'Information Technology',
        minor: 'Software Development'
    }],
    online: [{
        name: 'Codeschool',
        courses: []
    },{
        name: 'TeamTreehouse',
        courses: []
    },{
        name: 'Udacity',
        courses: []
    }]
};

var work = {
    jobs: [{
        title: 'Full-Stack Javascript Developer',
        employer: 'Gannett',
        dates: 'February 2016 - Current',
        location: 'McLean, VA',
        description: 'As a "mid-level" developer for Gannett Digital I work on developing an enterprise publishing CMS using a plethora of technologies including Nodejs, angularjs, express.js, mongodb, couchbase, CQRS, and domain drive design'
    },{
        title: 'Associate Full-Stack Javascript Developer',
        employer: 'Gannett',
        dates: 'May 2015 - February 2016',
        location: 'McLean, VA',
        description: 'As an associate developer for Gannett Digital I worked on developing a new enterprise publishing CMS using Nodejs, angularjs, express.js, mongodb, and couchbase'
    },{
        title: 'Team Lead - Advanced Services & Support',
        employer: 'Gannett Media Technologies International',
        dates: 'August 2014 - May 2015',
        location: 'Chesapeake, VA',
        description: 'As Team Lead of the Advanced Services Team I act as the top tier of support for GMTI’s Support Team. As well as oversee the daily operations and tasks of my direct reports.'
    },{
        title: 'Senior Analyst - Advanced Services & Support',
        employer: 'Gannett Media Technologies International',
        dates: 'December 2013 - August 2014',
        location: 'Chesapeake, VA',
        description: 'The Advanced Services Senior Support Analyst position required troubleshooting and responding to issues escalated by the Advanced Services Team when no standard solution existed for issues with any of Gannett’s web based applications. As well as working to automate and standardize troubleshooting processes.'
    },{
        title: 'Support Analyst - Advanced Services & Support',
        employer: 'Gannett Media Technologies International',
        dates: 'June 2013 - December 2013',
        location: 'Norfolk, VA',
        description: 'The Advanced Services Support Analyst position required troubleshooting and responding to issues escalated by the Services Desk when no standard solution exists for issues with any of Gannett’s web based applications or services.'
    },{
        title: 'Tier2C (Junior Linux Systems Admin)',
        employer: 'Inmotion Hosting',
        dates: 'August 2012 - June 2013',
        location: 'Virginia Beach, VA',
        description: 'The Tier2C position is the escalation point for the all customer facing Tier1 and Tier1A support technicians. The job required near system admin level, knowledge and skills in a Red Hat Enterprise Linux & cPanel web hosting environment, and advanced knowledge of all popular CMS systems and coding languages.'
    },{
        title: 'Tier1A (Technical Support Rep)',
        employer: 'Inmotion Hosting',
        dates: 'January 2012 - August 2012',
        location: 'Virginia Beach, VA',
        description: ''
    }]
};

var projects = [{
    title: 'Grace Street Grill Website',
    dates: '2013',
    description: 'Static website built using EmberJS',
    images: ['img/smalls/gsg-site1-small@2x.png']
}];

var dataPlaceholder = '%data%';
var $header = $('#header');
var $workExp = $('#workExperience');
var $projects = $('#projects');

$header.prepend(insertData(HTMLheaderRole, bio.role));
$header.prepend(insertData(HTMLheaderName, bio.name));

if (bio.skills.length > 0) {
    $header.append(HTMLskillsStart);
    bio.skills.forEach(function(skill) {
        $('#skills').append(insertData(HTMLskills, skill));
    });
}

if (work.jobs.length > 0) {
    displayWork();
}

projects.display = function() {
    projects.forEach(function(project) {
        $projects.append(HTMLprojectStart);
        $('.project-entry:last').append(insertData(HTMLprojectTitle, project.title));
        $('.project-entry:last').append(insertData(HTMLprojectDates, project.dates));
        $('.project-entry:last').append(insertData(HTMLprojectDescription, project.description));
        if (project.images.length > 0) {
            project.images.forEach(function(image) {
                $('.project-entry:last').append(insertData(HTMLprojectImage, image));
            });
        }
    });
};

if (projects.length > 0) {
    projects.display();
}

function insertData(template, text) {
    return template.replace(dataPlaceholder, text);
}

function displayWork() {
    work.jobs.forEach(function(job) {
        $workExp.append(HTMLworkStart);
        var jobTitle = insertData(HTMLworkEmployer, job.employer) + insertData(HTMLworkTitle, job.title);
        $('.work-entry:last').append(jobTitle);
        $('.work-entry:last').append(insertData(HTMLworkDates, job.dates));
        $('.work-entry:last').append(insertData(HTMLworkLocation, job.location));
        $('.work-entry:last').append(insertData(HTMLworkDescription, job.description));
    });
}

$('#mapDiv').append(googleMap);
