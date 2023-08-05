First official Github release:

# v1.2.5 `Current`

- Fixed teacher name parsing, schedule generator should work again
- Fixed class parsing for free periods and semester-long classes

# v0.9.2

### Changes:

- Reduced permissions load, now uses `https://*.aeries.net/*` template instead of requiring `*://*`

# Previous Versions (_first release only_):

## v0.9.1

### Changes:

- Various Bug Fixes

## v0.9.0

### Changes:

- Changed info page, added refrence images, and made all versions on subpages set themselves based on the manifest

## v0.8.9

### Changes:

- Added info page on first install

## v0.8.8

### Changes:

- Added tutorial for new users, cleaned up some bugs
- Note that auto-login still has to be on to be able to use the `Class Schedule` and `Quick Check Grades` pages

## v0.8.7

### Changes:

- Added a `Class Schedule` page that operates similarly to the `Quick Check Grades` one, only for classes, rooms, teachers, and their emails

## v0.8.6

### Changes:

- Added automatic dashboard tab opening (in background) for the `quick check grades` tab where needed and better error message
- note that this requires that you have first opened the menu while on a tab with yourdistrict.asp.aeries.net/student in the url, or similar

## v0.8.5:

### Changes:

- Slight ### Changes to previously mentioned clarification message

## v0.8.3:

### Changes:

- Added clarification message when no Aeries tabs are open
  Coming soon:
- Message for when tab is inactive/out of date, from before current version of extention. (possibly force reload them?)

## v0.8.3:

### Changes:

- Added Quick grade check page
- Added more chrome.runtime.message calls/registered 'scrape'
- Feature needs a active aeries dashboard page open (not timed out/old)

## v0.8.2:

### Changes:

- Scores for assignments on the GradebookDetails.aspx page are now also colored

## v0.8.1:

### Changes:

- Grade colors now apply to all grades, not just card view for GradebookSummary.aspx page
- Grades in small tables are now also bolded + colored
  Coming soon:
- Colored scores for assignments?

## v0.8.0:

### Changes:

- Custom Grade Colors now apply to all pages (that use grade elements)
- Added better logging for grade debug
- Grade colors now reload on scroll
- Removed border inconsistencies for student info subpages
- Scrollbar now properly positioned on attendance pages (overflow from table)
  Coming soon:
- Width matching for all elements on Student Info -> Profile page

## v0.7.9:

### Changes:

- Added custom grade colors (not just by letter, + and - variations also diff now)
  Anticipated:
- Customization for grade colors

## v0.7.8:

### Changes:

- Added better UI for Gradebook Pages, specifically `Gradebook Details` and `Grades`

## v0.7.7:

### Changes:

- Added css and a bit of js for Grades subpages, were previously inaccessible

## v0.7.5:

### Fixes:

- Identified problem for '𝘊𝘰𝘶𝘭𝘥 𝘯𝘰𝘵 𝘦𝘴𝘵𝘢𝘣𝘭𝘪𝘴𝘩 𝘤𝘰𝘯𝘯𝘦𝘤𝘵𝘪𝘰𝘯' error, `fixed`

## v0.7.4:

     ### Changes:

- Added reset button for options
  Bugs:
- Persist, see last version :(

## v0.7.3 :

     ### Changes:
    - Added switch to toggle customizations
    - Added new icon and switching when the above is toggled on/off
    - Rearranged code, now separate folders for js, css, etc.
      Bugs:
    - Sub-menu enter/exit defies strict css transition rules, stays visible for at least 200ms too long
    - Nav buttons take up entire height when `float on scroll` is off
    - May throw '𝘜𝘯𝘤𝘩𝘦𝘤𝘬𝘦𝘥 𝘳𝘶𝘯𝘵𝘪𝘮𝘦.𝘭𝘢𝘴𝘵𝘌𝘳𝘳𝘰𝘳: 𝘊𝘰𝘶𝘭𝘥 𝘯𝘰𝘵 𝘦𝘴𝘵𝘢𝘣𝘭𝘪𝘴𝘩 𝘤𝘰𝘯𝘯𝘦𝘤𝘵𝘪𝘰𝘯. 𝘙𝘦𝘤𝘦𝘪𝘷𝘪𝘯𝘨 𝘦𝘯𝘥 𝘥𝘰𝘦𝘴 𝘯𝘰𝘵 𝘦𝘹𝘪𝘴𝘵.' error, though it... does exist.

## Previous Versions

#### Archiving and/or git were not in place for previous versions :(
