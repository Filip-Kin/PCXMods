// ==UserScript==
// @name         Filip's PCX Mods
// @namespace    https://filipkin.com
// @version      0.6.7
// @description  Make PCX like actually usable
// @author       Filip Kin
// @match        https://*.lms.pearsonconnexus.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Apply dark theme
  let applyDarkTheme = () => {
    let link = document.createElement('link');
    link.rel = 'stylesheet'
    link.href = 'https://filipkin.com/s/pcxdarktheme.css';
    document.head.appendChild(link);
    console.log('Applied dark theme');
  }

  // Remove !important tag on color related css
  let killImportant = () => {
    for (let elm of document.head.children) {
      if (elm.nodeName === 'STYLE') {
        let importantRegex = /(color:[ ]{0,}#[0-9a-f]{3,6})[ ]{0,}\!important/;
        elm.innerHTML = elm.innerHTML.replace(importantRegex, '$1');
      }
    }
  }

  // Remove Webmail button from nav
  let killWebMail = () => {
    console.debug('Attempting to remove webmail from nav');
    document.querySelector("mat-nav-list > div.main-menu.ng-trigger.ng-trigger-navMenu > a:nth-child(5)").remove();
  }

  // Fix nav after page reload
  let fixNav = () => {
    document.querySelectorAll('mat-sidenav .mat-nav-list .mat-list-item .mat-list-item-content').forEach(item => {
      item.style.padding = 0;
      item.style.padding = '0 16px'; // It seems turning the padding off and on fixes it
    });
  }

  // Add percentages next to progress bars
  let percentages = () => {
    console.debug('Attempting to show percentages next to progress bars');
    document.querySelectorAll('app-student-courses mat-progress-bar > div.mat-progress-bar-primary.mat-progress-bar-fill').forEach(bar => {
      let percentage = Math.round(bar.style.transform.match(/scaleX\(([0-9.]+)\)/)[1] * 100); // Get the percentage from the scaleX of the bar
      let div = document.createElement('div'); // Make a new div for the number
      div.classList.add('mat-progress-bar-percentage'); // Apply css class which moves it up and to the left
      div.innerHTML = percentage + '%'; // Put the number in
      bar.parentElement.parentElement.appendChild(div); // Add it to the grandparent of the bar
    });
  };

  // Replace minutes spent in course with hours
  let timeSpent = () => {
    console.debug('Attemptign to replace minutes spent with hours spent');
    document.querySelectorAll('app-student-courses div.detail-ct span.minutes.ng-star-inserted').forEach(elm => {
      if (elm.innerHTML.includes('h')) {
          console.debug('Time spent already in hours');
      } else {
          let minutes = elm.innerHTML.replace('m', ''); // Grab just the number
          let time = Math.round(minutes / 6) / 10 // Divide minutes by 60 then multiply by 10 to round to 1 decimal point and divide back by 10
          elm.innerHTML = time + 'h'; // Put it back where it came from
      }
    });
  }

  // Recolor highlighted text
  let highlightedRecolor = () => {
    console.debug('Attempting to recolor highlighted text');
    document.querySelectorAll('font, ul, li, b, span, td, p, div, .xli-item-content font, .xli-item-content ul, .xli-item-content li, .xli-item-content b, .xli-item-content span, .xli-item-content td, .xli-item-content p, .xli-item-content div').forEach(elm => {
        let bgCol = elm.style.backgroundColor;
        if (bgCol === 'rgb(255, 255, 0)') {
              elm.style.backgroundColor = 'rgb(0, 125, 255)'
        } else if (bgCol === 'rgb(255, 255, 253)' || bgCol === 'rgb(253, 253, 253)' || bgCol === 'rgb(255, 255, 255)') {
              elm.style.backgroundColor = '';
        }
    });
  }

  // Invert color on pictures in quizzes
  let invertQuizImg = () => {
      document.querySelectorAll("xli-question img").forEach(elm => {
          elm.style.filter = "invert()";
      });
  }

  // On page connect run some init stuff
  let init = () => {
    applyDarkTheme();
  }

  // On page load run the javascriptz
  let load = () => {
    setTimeout(() => {
      try { // Try doing all the JS magicz
        killImportant();
        killWebMail();
        percentages();
        timeSpent();
        highlightedRecolor();
        invertQuizImg();
        setTimeout(highlightedRecolor, 1000); // Sometimes course content takes a little bit to load
        setTimeout(highlightedRecolor, 2000);
        setTimeout(highlightedRecolor, 3000);
        setTimeout(highlightedRecolor, 4000);
        setTimeout(highlightedRecolor, 5000); // And this is my lazy way  of getting around this issue
        // TODO: Make an interval that checks the course item content to see if it's done loading
        console.log('Filip\'s PCX Mods fully loaded :)'); // If it worked without error, we all good
      } catch (err) {
        // If we get an error it means the page didn't load yet
        // Or I suck at programming, one of the two
        console.debug('Failed to run javascript because ' + err.message);
        return load(); // So run load() again and stop this function
      }
      console.log('Starting location change loop'); // If we all good then we can start the reload listener
      locationChangeLoop();
    }, 200); // Add a 200ms delay between runs so we're not just freezing the page
  }

  // One page reload, some things get messed up
  let reload = () => {
    setTimeout(() => {
      try {
        percentages();
        timeSpent();
        highlightedRecolor();
        invertQuizImg();
        setTimeout(highlightedRecolor, 1000); // Sometimes course content takes a little bit to load
        setTimeout(highlightedRecolor, 2000);
        setTimeout(highlightedRecolor, 3000);
        setTimeout(highlightedRecolor, 4000);
        setTimeout(highlightedRecolor, 5000); // And this is my lazy way  of getting around this issue
        // TODO: Make an interval that checks the course item content to see if it's done loading
        fixNav();
        console.log('Filip\'s PCX Mods reloaded'); // If it worked without error, we all good
      } catch (err) {
        // Didn't load yet
        console.debug('Failed to run javascript because ' + err.message);
        return reload();
      }
      console.log('Starting location change loop');
      locationChangeLoop();
    }, 200); // reload is basically load but slightly different
  }

  // When you navigate in PCX it doesn't actually change the page you're on
  // It's all a fancy app where the page stays the same and just loads different content
  // Thankfully the url still changes and we can listen for that
  let interval; // Save the loop so we can delete it later
  let currentLocation = window.location.href; // Get the inital load location
  let locationChange = () => {
    console.debug('Checking location');
    if (window.location.href !== currentLocation) {
      console.debug('location changed');
      currentLocation = window.location.href; // Reset location
      clearInterval(interval); // Remove current interval
      reload(); // Initialize the reload loop
    } else {
      console.debug('location did not change');
    }
  }
  // Quickly restart the loop
  let locationChangeLoop = () => {
    interval = setInterval(locationChange, 1000); // Checking every second is enough even on fast computers
  }

  // Everything is defined! Let's load!
  init();
  load();
})();
