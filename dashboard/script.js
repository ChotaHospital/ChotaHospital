const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");
const main = document.querySelector(".section");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  main.classList.toggle("active");
});

const toggleMenu = (isMenuAction) => {
  sidebar.style.height = isMenuAction
    ? `${sidebar.scrollHeight}px`
    : collapsedSidebarHeight;

  menuToggler.querySelector("span").innerHTML = isMenuAction ? "close" : "menu";
};

menuToggler.addEventListener("click", () => {
  toggleMenu(sidebar.classList.toggle("menu-active"));
});

window.addEventListener("resize", () => {
  if (window.innerHeight >= 800) {
    sidebar.style.height = fullSidebarHeight;
  } else {
    sidebar.classList.remove("collapsed");
    // sidebar.style.height = 'auto';
    toggleMenu(sidebar.classList.contains("menu-active"));
  }
});

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 *
 * @param {Date} date
 */

function formatTime(date) {
  const hours = date.getHours() % 24;
  const mins = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

/**
 *
 * @param {Date} date
 */

function formatDate(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${days[date.getDay()]} ${date.getDate()} ${mon[date.getMonth()]}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);

//

//
const getCSSVariable = (variable, fallback) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim() || fallback;

const colorPrimary = getCSSVariable("--color-primary", "#3498db");
const colorLabel = getCSSVariable("--color-label", "#7f8c8d");
const fontFamily = getCSSVariable("--font-family", "Arial, sans-serif");

const sharedStyles = {
  fontFamily: fontFamily,
  colors: colorLabel,
};

const defaultOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    width: "100%",
    height: 180,
    offsetY: 18,
  },
  dataLabels: { enabled: false },
};

const areaChartOptions = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "area",
  },
  tooltip: {
    enabled: true,
    style: { fontFamily: sharedStyles.fontFamily },
    y: {
      formatter: (value) => `${value.toLocaleString()}`, // Adds commas for thousands
    },
  },
  series: [
    {
      name: "Views",
      data: [15, 50, 18, 90],
    },
  ],
  colors: [colorPrimary],
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        { offset: 0, opacity: 0.2, color: colorPrimary },
        { offset: 100, opacity: 0, color: colorPrimary },
      ],
    },
  },
  stroke: {
    colors: [colorPrimary],
    lineCap: "round",
  },
  grid: {
    borderColor: "rgba(0, 0, 0, 0)",
    padding: {
      top: -30,
      right: 0,
      bottom: -8,
      left: 20, // Increased padding for the left
    },
  },
  markers: {
    strokeColors: colorPrimary,
  },
  yaxis: { show: false },
  xaxis: {
    labels: {
      show: true,
      floating: true,
      style: {
        colors: sharedStyles.colors,
        fontFamily: sharedStyles.fontFamily,
      },
    },
    axisBorder: { show: false },
    crosshairs: { show: false },
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    tickPlacement: "on", // Ensures ticks align with labels properly
  },
};

const renderChart = (selector, options) => {
  const chartElement = document.querySelector(selector);
  if (chartElement) {
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  } else {
    console.error(`Element with selector "${selector}" not found.`);
  }
};

renderChart(".area-chart", areaChartOptions);

// const dateButtons = document.querySelectorAll(".date-picker button");
// const dateButtons = document.querySelectorAll(".date-picker button");
// let currentDate = new Date();

// function formatDate(date) {
//   return date.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//   });
// }

// function highlightCurrentDate() {
//   dateButtons.forEach((button) => {
//     const buttonDate = new Date(button.textContent + " 2024");
//     if (buttonDate.toDateString() === currentDate.toDateString()) {
//       button.style.fontWeight = "bold";
//       button.style.backgroundColor = "#dfe6e9";
//     } else {
//       button.style.fontWeight = "normal";
//       button.style.backgroundColor = "transparent";
//     }
//   });
// }

// function setDates() {
//   const startDate = new Date("2024-12-10");
//   dateButtons.forEach((button, index) => {
//     const date = new Date(startDate);
//     date.setDate(startDate.getDate() + index);
//     button.textContent = formatDate(date);

//     button.addEventListener("click", () => {
//       dateButtons.forEach((btn) => {
//         btn.style.fontWeight = "normal";
//         btn.style.backgroundColor = "transparent";
//         btn.style.color = "#000";
//       });
//       // button.style.fontWeight = 'bold';  // Highlight clicked button
//       button.style.backgroundColor = "#6c5ce7";
//       button.style.color = "#fff";
//     });
//   });
//   highlightCurrentDate();
// }

// setDates();

// const dateButtons = document.querySelectorAll(".date-picker button");
// let currentDate = new Date();

// function formatDate(date) {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   return `${days[date.getDay()]}  ${date.getDate()}`; // Day and Date only
// }

// function highlightCurrentDate() {
//   dateButtons.forEach((button) => {
//     const buttonDate = new Date(button.textContent + " 2024");
//     if (buttonDate.toDateString() === currentDate.toDateString()) {
//       button.style.fontWeight = "bold";
//       button.style.backgroundColor = "#dfe6e9";
//     } else {
//       button.style.fontWeight = "normal";
//       button.style.backgroundColor = "transparent";
//     }
//   });
// }

// function setDates() {
//   const startDate = new Date("2024-12-10");
//   dateButtons.forEach((button, index) => {
//     const date = new Date(startDate);
//     date.setDate(startDate.getDate() + index);
//     button.textContent = formatDate(date); // Set the formatted date like "Thu 12"

//     button.addEventListener("click", () => {
//       dateButtons.forEach((btn) => {
//         btn.style.fontWeight = "normal";
//         btn.style.backgroundColor = "transparent";
//         btn.style.color = "#000";
//       });
//       // button.style.fontWeight = 'bold';  // Highlight clicked button
//       button.style.backgroundColor = "#6c5ce7";
//       button.style.color = "#fff";
//     });
//   });
//   highlightCurrentDate();
// }

// setDates();

const datePicker = document.querySelector(".date-picker");
let currentDate = new Date(); // Tracks the real-time current date
let selectedDate = null; // Tracks the user-selected date

function formatDate(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[date.getDay()]} ${date.getDate()}`; // Example: "Thu 12"
}

function createDatePicker(centerDate) {
  // Clear the date picker container
  datePicker.innerHTML = "";

  // Generate the range of dates (-2, -1, 0, +1, +2 relative to the center date)
  for (let i = -2; i <= 2; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i);

    // Create the date element
    const dateElement = document.createElement("div");
    dateElement.textContent = formatDate(date);
    dateElement.classList.add("dateNew");

    // Highlight the current date if no user selection, otherwise highlight the selected date
    if (selectedDate === null && i === 0) {
      dateElement.classList.add("current-date");
    } else if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      dateElement.classList.add("current-date");
    }

    // Add click event listener to handle manual selection
    dateElement.addEventListener("click", () => {
      // Remove the highlight from all dates
      document.querySelectorAll(".dateNew").forEach((el) => {
        el.classList.remove("current-date");
      });

      // Highlight the clicked date
      dateElement.classList.add("current-date");
      selectedDate = date; // Update the manually selected date
    });

    datePicker.appendChild(dateElement);
  }
}

function checkForDateChange() {
  setInterval(() => {
    const now = new Date(); // Get the real-time date

    // If the date changes and no date is manually selected, update the picker
    if (
      now.toDateString() !== currentDate.toDateString() &&
      selectedDate === null
    ) {
      currentDate = now; // Update the global current date
      createDatePicker(currentDate); // Recreate the date picker
    }
  }, 1000); // Check every second
}

// Initialize the date picker and start the date change checker
createDatePicker(currentDate);
checkForDateChange();
