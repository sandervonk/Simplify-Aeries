# Installation
 - [ ]  Download the latest .zip from [releases](https://github.com/sandervonk/simplify-aeries/releases) and unzip it into the current folder (there's a folder inside the zip so you dont want to have a nested structure)
 - [ ]  Navigate to _edge://extentions_ or _chrome://extentions_ depending on your browser
 - [ ]  Next, find the switch labeled _**`Developer mode`**_ and make sure it is on
 - [ ]  Click _**`Load Unpacked`**_ and select the folder named 'Simplify Aeries' that the .zip extracted into
 - [ ]  Finally, just press 'Select Folder' or the equivalent button for opening the folder in your browser
 - [ ]  [ ]  Simplify Aeries should now be installed!! Try visiting an _*.aeries.net_ site and it should work!
 - [ ]  If you have any problems, please contact me, oh and to customize settings and access the 'quick-check' features, click the extention's icon in your extentions tray

# New features and instructions

 ## How to access the new features: 
<details>
<summary>Instructions</summary>

Page             |  Instructions
:---------------------------------------:|:-------------------------:
<img width="1000px" src="https://user-images.githubusercontent.com/10799950/126916354-bfcc777d-2d9b-4a37-a527-835fb760cb85.png"> |  Open the menu on the top right of the page (labeled with your email) and select `Simplify Aeries`
<img width="1000px" src="https://user-images.githubusercontent.com/10799950/126916257-c5005176-c245-469c-8c78-46d7c24167dd.png"> | At the top of the login pane, click the settings icon (labeled [Open Simplify Aeries Settings]) to open the new settings menu

</details>

## How to use the new menu
<details>
<summary>Login Settings</summary>

Login Item                                                                                       | Function
:----------------------------------------------------------------------:|:------------------------------------------------------------------------:
<img src="https://user-images.githubusercontent.com/10799950/126916483-0bfd6d08-dad6-4b51-82d7-a6cd56704fea.png" width="1000px"> |  This option does more or less what the title explains, it hides the name of your school district on the login page, making for a cleaner interface
<img src="https://user-images.githubusercontent.com/10799950/126916541-dbd154de-2de0-48d9-8be5-5cf4b2e3fe95.png" width="1000px"> |  Use this option only if you normally log in with a Google account . Initially, the bottom part will not show, you will have to check the box to be able to enter your email. Make sure that the box turns green after you've entered it. If the background of any of the text is blue or white, it has been autofilled, which is sadly not yet supported
<img src="https://user-images.githubusercontent.com/10799950/126916667-71dd247e-cb5e-40a4-adac-bcd2b5cdb83a.png" width="1000px"> | The last item in this section is the login background color. Like any of the color pickers on this page, click the square to the left of the text and select a color to continue
</details>

<details>
<summary>Dashboard Settings</summary>

Dashboard Item                                                                              | Function
:----------------------------------------------------------------------:|:------------------------------------------------------------------------:
<img src="https://user-images.githubusercontent.com/10799950/126916691-e279b7bc-cc3e-4464-a5e3-e7f04c487fb3.png" width="1000px"> | First up in this section we have the sidebar color customizer. Click on the solid-colored boxes to either side of the gradient to bring up a color picker. Using this feature on the dashboard should un-blur the sidebar to the side, though note that this feature is still pretty buggy, as the 'blur' and 'focus' events can sometimes fire twice and mess up the display
<img src="https://user-images.githubusercontent.com/10799950/126916824-63d9a1a8-b96f-4263-93ee-eff160d7d324.png" width="1000px"> | Next up is the background _image_ panel. It will only show if 'Use Background Image?' is checked. put an image url in the box next to the `https://` placeholder. It should turn green, if not, the image could not be loaded. Note that only images that get a green background will be set as the background, otherwise the color will be used
<img src="https://user-images.githubusercontent.com/10799950/126916946-40bfc479-d665-4e02-a55b-037c263c483f.png" width="1000px"> | Last but not least, we have the dashboard background _color_ picker. Click the square on the left to select a color of your choice. Note that this section will only show if 'Use Background Image?' is _**unchecked**_
</details>

<details>
<summary>Feature Settings</summary>

Feature Item                                                                                    | Function
:----------------------------------------------------------------------:|:------------------------------------------------------------------------:
<img src="https://user-images.githubusercontent.com/10799950/126916991-13624c13-4590-412e-b0ea-48ccc978607e.png" width="1000px"> | The features menu is currently empty, but will include settings pertaining to the `Quick Check Grades` and `Class Schedule` features available from the main menu page
</details>

## Note: _ALL SETTINGS ONLY SAVE WHEN THE MENU IS CLOSED AS SUCH:_
<details>
<summary>Menu Close Instructions</summary>
<img src="https://user-images.githubusercontent.com/10799950/126917229-d4068054-1cfb-45fb-abbb-88b37a0f41c4.png" width="49%"> <img src="https://user-images.githubusercontent.com/10799950/126917251-4146e400-d39f-4dc8-afcb-7f2ced9867a2.png" width="49%">
</details> 




# Info

### _Made by me, yay!_

Features in Place:

- updated dashboard
- updated login
- updated _Test Scores_ page
- updated _Student-Profile_ page
- options page
- options popup

To-do:

- Subpages
  - Student Info
    - ~~_Profile_~~
    - ~~_Demographics_~~
    - ~~_Contacts_~~
    - ~~_Fees and Fines_~~
  - Attendance
  - Grades
    - ~~_Graduation Status_~~
    - ~~_Transcripts_~~
    - ~~_Gradebook_~~
    - ...
  - Classes
    - ~~_Classes_~~
    - Course Requests [hidden :(]
  - Test Scores
    - ~~_Test Details_~~
    - ~~_State Test Scores Report_~~
    - ~~_Test Scores_~~
- Add personalization
  - Have already
    - Login Background Color
    - Auto-Login
    - Floating Nav Buttons
    - Sidebar Gradient Colors
    - Dashboard Background
      - Background Color
      - Background Image
  ## Need
- Small Features
  - _Make IP address actually show well when different from last login (atm just hides when current and last are same)_
  - _Make dropdowns either show or not show faded background, pick one for all (atm the notifications are the outlier with a bg)_
    Fixes:
- Remove transition on sub-menu enter/exit
- Make Nav buttons not take up entire height when `float on scroll` is off

# Versions

### v0.9.2 `Current`

#### Changes:

- Reduced permissions load, now uses `https://*.aeries.net/*` template instead of requiring `*://*`

### v0.9.1

#### Changes:

- Various Bug Fixes

### v0.9.0

#### Changes:

- Changed info page, added refrence images, and made all versions on subpages set themselves based on the manifest

### v0.8.9

#### Changes:

- Added info page on first install

### v0.8.8

#### Changes:

- Added tutorial for new users, cleaned up some bugs
- Note that auto-login still has to be on to be able to use the `Class Schedule` and `Quick Check Grades` pages

### v0.8.7

#### Changes:

- Added a `Class Schedule` page that operates similarly to the `Quick Check Grades` one, only for classes, rooms, teachers, and their emails

### v0.8.6

#### Changes:

- Added automatic dashboard tab opening (in background) for the `quick check grades` tab where needed and better error message
- note that this requires that you have first opened the menu while on a tab with yourdistrict.asp.aeries.net/student in the url, or similar

### v0.8.5:

#### Changes:

- Slight #### Changes to previously mentioned clarification message

### v0.8.3:

#### Changes:

- Added clarification message when no Aeries tabs are open
  Coming soon:
- Message for when tab is inactive/out of date, from before current version of extention. (possibly force reload them?)

### v0.8.3:

#### Changes:

- Added Quick grade check page
- Added more chrome.runtime.message calls/registered 'scrape'
- Feature needs a active aeries dashboard page open (not timed out/old)

### v0.8.2:

#### Changes:

- Scores for assignments on the GradebookDetails.aspx page are now also colored

### v0.8.1:

#### Changes:

- Grade colors now apply to all grades, not just card view for GradebookSummary.aspx page
- Grades in small tables are now also bolded + colored
  Coming soon:
- Colored scores for assignments?

### v0.8.0:

#### Changes:

- Custom Grade Colors now apply to all pages (that use grade elements)
- Added better logging for grade debug
- Grade colors now reload on scroll
- Removed border inconsistencies for student info subpages
- Scrollbar now properly positioned on attendance pages (overflow from table)
  Coming soon:
- Width matching for all elements on Student Info -> Profile page

### v0.7.9:

#### Changes:

- Added custom grade colors (not just by letter, + and - variations also diff now)
  Anticipated:
- Customization for grade colors

### v0.7.8:

#### Changes:

- Added better UI for Gradebook Pages, specifically `Gradebook Details` and `Grades`

### v0.7.7:

#### Changes:

- Added css and a bit of js for Grades subpages, were previously inaccessible

### v0.7.5:

#### Fixes:

- Identified problem for '𝘊𝘰𝘶𝘭𝘥 𝘯𝘰𝘵 𝘦𝘴𝘵𝘢𝘣𝘭𝘪𝘴𝘩 𝘤𝘰𝘯𝘯𝘦𝘤𝘵𝘪𝘰𝘯' error, `fixed`

### v0.7.4:

    #### Changes:

- Added reset button for options
  Bugs:
- Persist, see last version :(

### v0.7.3 :

    #### Changes:
    - Added switch to toggle customizations
    - Added new icon and switching when the above is toggled on/off
    - Rearranged code, now separate folders for js, css, etc.
      Bugs:
    - Sub-menu enter/exit defies strict css transition rules, stays visible for at least 200ms too long
    - Nav buttons take up entire height when `float on scroll` is off
    - May throw '𝘜𝘯𝘤𝘩𝘦𝘤𝘬𝘦𝘥 𝘳𝘶𝘯𝘵𝘪𝘮𝘦.𝘭𝘢𝘴𝘵𝘌𝘳𝘳𝘰𝘳: 𝘊𝘰𝘶𝘭𝘥 𝘯𝘰𝘵 𝘦𝘴𝘵𝘢𝘣𝘭𝘪𝘴𝘩 𝘤𝘰𝘯𝘯𝘦𝘤𝘵𝘪𝘰𝘯. 𝘙𝘦𝘤𝘦𝘪𝘷𝘪𝘯𝘨 𝘦𝘯𝘥 𝘥𝘰𝘦𝘴 𝘯𝘰𝘵 𝘦𝘹𝘪𝘴𝘵.' error, though it... does exist.

## Previous Versions

##### Archiving and/or git were not in place for previous versions :(
