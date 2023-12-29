// Define global variables to store totalGradePoints, totalCourseUnits, and saved GP results
let totalGradePoints = 0;
let totalCourseUnits = 0;
let totalNumberOfCourses = 0;
const savedGPResults = [];

// Function to compute GP and display input fields
document.getElementById("computeButton").addEventListener("click", function() {
    const totalMarksInputs = document.querySelectorAll('input[name="totalMarks[]"]');
    const courseUnitInputs = document.querySelectorAll('input[name="courseUnit[]"]');
    
    totalGradePoints = 0;
    totalCourseUnits = 0;
    totalNumberOfCourses = 0;

    for (let i = 0; i < totalMarksInputs.length; i++) {
        const totalMarks = parseFloat(totalMarksInputs[i].value);
        const courseUnit = parseFloat(courseUnitInputs[i].value);

        if (!isNaN(totalMarks) && !isNaN(courseUnit)) {
            const gradePoint = calculateGradePoint(totalMarks);
            totalGradePoints += gradePoint * courseUnit;
            totalCourseUnits += courseUnit;
            totalNumberOfCourses++;
        }
    }

    if (totalCourseUnits > 0) {
        document.getElementById("inputFields").style.display = "block";
    } else {
        alert("Please enter valid marks and units.");
    }
});

// Function to calculate grade point
function calculateGradePoint(totalMarks) {
    if (totalMarks >= 75) return 4.0; // A
    if (totalMarks >= 70) return 3.5; // B
    if (totalMarks >= 65) return 3.25; // C
    if (totalMarks >= 60) return 3.0; // D
    if (totalMarks >= 55) return 2.75; // E
    if (totalMarks >= 50) return 2.5; // E
    if (totalMarks >= 45) return 2.25; // E
    if (totalMarks >= 40) return 2.0; // E
    return 0.0; // Default if none of the conditions match
}

// Function to clear input fields
document.getElementById("clearButton").addEventListener("click", function() {
    const totalMarksInputs = document.querySelectorAll('input[name="totalMarks[]"]');
    const courseUnitInputs = document.querySelectorAll('input[name="courseUnit[]"]');
    
    totalMarksInputs.forEach(input => input.value = "");
    courseUnitInputs.forEach(input => input.value = "");
});

// Function to calculate GP and display results
document.getElementById("calculateButton").addEventListener("click", function() {
    const studentName = document.getElementById("studentName").value;
    
    if (studentName.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    const GPA = totalGradePoints / totalCourseUnits;
    const studentClass = determineClass(GPA);
    displayResults(studentName, GPA, studentClass, totalGradePoints, totalCourseUnits);
});

// Function to determine the class based on GPA
function determineClass(GPA) {
    if (GPA >= 3.5) return "Distinction";
    if (GPA >= 3.0) return "Upper Credit";
    if (GPA >= 2.5) return "Lower Credit";
    if (GPA >= 2.0) return "Pass";
    return "Fail";
}

// Function to display results in the pop-up
function displayResults(studentName, GPA, studentClass, totalGradePoints, totalCourseUnits) {
    const resultPopup = document.getElementById("resultPopup");
    resultPopup.style.display = "block";

    document.getElementById("displayedName").textContent = `Name:  ${studentName}`;
    document.getElementById("displayedGP").textContent = `Total GP: ${GPA.toFixed(5)}`;
    document.getElementById("displayedClass").textContent = `Class: ${studentClass}`;
    document.getElementById("displayedTotalGradePoint").textContent = `Total Grade Points: ${totalGradePoints.toFixed(5)}`;
    document.getElementById("displayedTotalUnit").textContent = `Total Course Units: ${totalCourseUnits}`;
    document.getElementById("displayedTotalCourses").textContent = `Total Number Of Courses: ${totalNumberOfCourses}`;
}

// Function to close the pop-up
document.getElementById("closePopup").addEventListener("click", function() {
    const resultPopup = document.getElementById("resultPopup");
    resultPopup.style.display = "none";
});

// Function to save the results
document.getElementById("saveResultButton").addEventListener("click", function() {
    const studentName = document.getElementById("studentName").value;
    const GPA = totalGradePoints / totalCourseUnits;
    const studentClass = determineClass(GPA);

    // Calculate the total number of courses for this result
    const totalCoursesForThisResult = document.querySelectorAll('input[name="totalMarks[]"]').length;
    
    const result = {
        name: studentName,
        GPA: GPA.toFixed(5),
        class: studentClass,
        totalGradePoints: totalGradePoints.toFixed(5),
        totalCourseUnits: totalCourseUnits,
        totalCourses: totalNumberOfCourses,
    };

    savedGPResults.push(result);
    updateSavedResultsList();
    alert("Results saved!");

    document.getElementById("saveGPSection").style.display = "none";
    document.getElementById("studentName").value = "";
});
// Function to show the "Save GP Results" section when the "Save GP" button is clicked
document.getElementById("saveGPButton").addEventListener("click", function() {
    document.getElementById("saveGPSection").style.display = "block";
});

// Function to update the saved GP results list
function updateSavedResultsList() {
    const savedGPList = document.getElementById("savedGPList");
    savedGPList.innerHTML = "";

    for (const result of savedGPResults) {
        const listItem = document.createElement("li"); // Define listItem here
        listItem.innerHTML = `Name: ${result.name}<br>GPA: ${result.GPA}<br>Class: ${result.class}<br>Total Grade Points: ${result.totalGradePoints}<br>Total Course Units: ${result.totalCourseUnits}<br>Total Number Of Courses: ${result.totalCourses}`;
        savedGPList.appendChild(listItem);
    }
}
// Call the function to populate the saved results when the page loads
window.addEventListener("load", updateSavedResultsList);
// Function to handle the About App button
document.getElementById("aboutAppButton").addEventListener("click", function() {
    alert("This is a Student GP Calculator App.");
});
   