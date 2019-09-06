// ==UserScript==
// @name         Filip's PCX Mods
// @namespace    https://filipkin.com
// @version      0.5.1
// @description  Make PCX like actually usable
// @author       Filip Kin
// @match        https://oxfcsd2643-oxva-ccl.lms.pearsonconnexus.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  let darkTheme = [`/* Filip's Dark Theme */
h1, h2, h3, h4, h5, p, li, div, h1.ng-scope, h2.ng-scope, h3.ng-scope, h4.ng-scope, h5.ng-scope, div.ng-scope, p.ng-scope, li.ng-scope {
    color: white !important;
}

a {
color: #03A9F4 !important;
}

/* Light Blue */
mat-toolbar.mat-toolbar.dialog-toolbar, app-student-courses mat-progress-bar .mat-progress-bar-fill:after, .app-theme-blue .mat-toolbar.mat-primary, html[buzz-version^="3."] .app-theme .mat-drawer-content.mat-sidenav-content mat-toolbar.buzz-main-header.app-primary-dark-background, .xli-activity-date.ng-binding.ng-scope {
 background: #0487d1 !important;
}

.app-theme-light-blue .mat-tab-header, .xli-activity-date.ng-binding.ng-scope {
border: none;
}

/* Dark Blue */
.left-ct.ng-pristine.ng-valid.ng-touched, .mat-tab-labels, .app-theme .mat-button-toggle-appearance-standard.mat-button-toggle-checked, .mat-tab-header-pagination {
background: #03569b !important;
color: white;
}

div.xli-comment-well {
  background: #3e4e57 !important;
  color: white !important;
}

div.xli-comment-well {
  border-color: #3e4e57 !important;
}

/* Darkest */
html, .main.app-background, .mat-drawer-inner-container, app-student-courses, app-student-to-do, app-student-stream, mat-nav-list, .app-background-card.top-page, mat, .announcement-list, .buzz-course-activity-stream, activity-sidebar, .buzz-course-home.ng-scope, .app-theme app-student-grades .mat-toolbar, .app-theme app-student-grades .main.ng-star-inserted, app-what-if.ng-star-inserted, app-gradebook-dashboard, app-student-activity, app-student-objective-mastery, app-badges, app-student-course-settings, app-settings form.top-content.app-background {
 background: #212121 !important;
 color: white !important;
}

/* Blueish */
.selected, .xli-selected, .mat-tab-body-content, body.xli-flex-enabled.app-theme, .xli-tree-content.xli-toolbar.xli-item-type-folder:hover, .buzz-side-bar xli-course-tree .xli-tree-content:hover, .buzz-tabbed-side-bar xli-course-tree .xli-tree-content:hover, .app-theme .mat-toolbar, .main.ng-star-inserted, .buzz-side-bar xli-course-tree .xli-selected, .buzz-tabbed-side-bar xli-course-tree div.xli-selected, .buzz-side-bar xli-course-tree div.xli-selected, .buzz-side-bar xli-course-tree div.xli-tree-content:hover, .buzz-tabbed-side-bar xli-course-tree div.xli-tree-content:hover, .menu-subentry-ct a.ng-trigger:hover, a.menu-course-entry.ng-trigger:hover, .mat-nav-list .mat-list-item.ng-star-inserted:hover, .app-theme .mat-button-toggle-appearance-standard:not(.mat-button-toggle-checked) {
  background-color: #263238 !important;
}

/* Dark */
a.menu-course-entry, .menu-subentry-ct a, .mat-card, .xli-date-group, app-user-notes-results, mat-table, mat-header-cell, mat-cell, mat-expansion-panel, app-inbox, .calendar-list, .buzz-course-summary, .buzz-course-details p, .buzz-course-details p font, .buzz-course-details p span, .buzz-folder-home, app-activity-item, .xli-flex-body.buzz-activity-ct, .xli-item-content span, .xli-item-content th, .mat-paginator-container, mat-calendar {
 background: #2c2f33 !important;
 color: white !important;
}

a.menu-course-entry:hover, .menu-subentry-ct a:hover, .calendar-list[_ngcontent-c22] .list-date[_ngcontent-c22] .list-date-events[_ngcontent-c22] .list-date-event[_ngcontent-c22]:focus, .calendar-list[_ngcontent-c22] .list-date[_ngcontent-c22] .list-date-events[_ngcontent-c22] .list-date-event[_ngcontent-c22]:hover, .item-combined.btn-border-less:hover, .buzz-folder-item>a:focus>span, .buzz-folder-item>a:hover>span {
  background-color: rgba(0,0,0,.04) !important;
}

mat-row:hover mat-cell {
  background-color: rgba(0,0,0,0) !important;
}

mat-panel-title, .xli-item-title, .item-title, label, span.minutes, td.mat-calendar-body-label.ng-star-inserted, th.ng-star-inserted {
color: white !important;
}

mat-divider.mat-divider.mat-divider-vertical {
border-color: #263238 !important;
}

.mat-checkbox-frame, .mat-radio-outer-circle {
border-color: #ffffff !important;
}

.mat-checkbox-disabled .mat-checkbox-frame {
border-color: #626262 !important;
}

.app-theme .mat-card-subtitle {
color: #c2c2c2 !important;
}

mat-icon, .app-theme .mat-list-base .mat-list-item, .app-theme .mat-list-base .mat-list-option, .mat-list-text, .app-no-data-message .app-theme h3, .app-theme .app-foreground-secondary-text, .app-theme .app-no-data-message h3 {
color: #EEEEEE !important;
}

.pass-color, .pass {
color: #00E676 !important;
}

.color-band.rounded {
background: #0487d1 !important;
}

.mat-progress-bar-percentage {
  transform: translate(-25px, -39px);
  position: absolute;
}`];
  let styleElm = document.createElement('style');
  styleElm.innerHTML = darkTheme[0];
  document.head.appendChild(styleElm);
  console.log('Applied dark theme');
  let percentages = () => {
    console.debug('Attempting to show percentages next to progress bars');
    document.querySelectorAll('app-student-courses mat-progress-bar > div.mat-progress-bar-primary.mat-progress-bar-fill').forEach(bar => {
      let percentage = Math.round(bar.style.transform.match(/scaleX\(([0-9.]+)\)/)[1]*100);
      let div = document.createElement('div');
      div.classList.add('mat-progress-bar-percentage');
      div.innerHTML = percentage+'%';
      bar.parentElement.parentElement.appendChild(div);
    });
  };
  let timeSpent = () => {
      console.debug('Attemptign to replace minutes spent with hours spent');
      document.querySelectorAll('app-student-courses div.detail-ct span.minutes.ng-star-inserted').forEach(elm => {
          let time = Math.round(elm.innerHTML.replace('m', '')/6)/10
          elm.innerHTML = time+'h';
      });
  }
  let doStuff = () => {
    setTimeout(() => {
      try {
        // Remove buttons from nav
        console.debug('Attempting to remove webmail from nav');
        document.querySelector("mat-nav-list > div.main-menu.ng-trigger.ng-trigger-navMenu > a:nth-child(5)").remove();

        // Add percentages to progress bars
        percentages();
        // Convert minutes to hours
        timeSpent();
        console.log('Filip\'s PCX Mods fully loaded :)');
      } catch (err) {
        // Didn't load yet
        console.debug('Failed to run javascript because '+err.message);
        return doStuff();
      }
      console.log('Starting location change loop');
      locationChangeLoop();
    }, 200);
  }
  let reload = () => {
      try {
        // Add percentages to progress bars
        percentages();
        // Convert minutes to hours
        timeSpent();
        // Fix menu items
        document.querySelectorAll('mat-sidenav .mat-nav-list .mat-list-item .mat-list-item-content').forEach(item => {
          item.style.padding = 0;
          item.style.padding = '0 16px';
        });
        console.log('Filip\'s PCX Mods reloaded');
      } catch (err) {
        // Didn't load yet
        console.debug('Failed to run javascript because '+err.message);
        return reload();
      }
      console.log('Starting location change loop');
      locationChangeLoop();
  }
  let interval;
  let currentLocation = window.location.href;
  let locationChange = () => {
      console.debug('Checking location');
      if (window.location.href !== currentLocation) {
          console.debug('location changed');
          currentLocation = window.location.href;
          clearInterval(interval);
          reload();
      } else {
          console.debug('location did not change');
      }
  }
  let locationChangeLoop = () => {
      interval = setInterval(locationChange, 1000);
  }
  doStuff();
})();
