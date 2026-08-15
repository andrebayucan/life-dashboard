<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

https://life-dashb.netlify.app/

<a href="https://life-dashb.netlify.app/">
  <img src="public/site-logo.png" alt="Logo" width="400" height="400">
</a>


<!-- ABOUT THE PROJECT -->
## About The Project

Life Dashboard displays information regarding organism observations around the world, providing users with search filters and chart data. Using the iNaturalist public REST API, a table lists 1000 species records at a time, showing their scientific names, record dates, and the number of observations associated with that creature in the database's system. Each creature record has its own page with extensive information about it, including a picture of the species, the location where it was found, a dot plot showing a maximum of thirty most recent records of that species, and more.

### Built With

This application was programmed with Javascript, CSS, and HTML in a React framework.
* [![React][React.js]][React-url]

### Features

- **The main dashboard displays 1000 organism records from the iNaturalist database**
  - Among the organisms in the table, users can view summary statistics about:
    - The organism with the least number of records
    - The most common year
    - The most common month
  - For each organism record, the table displays the following information:
    - Scientific name
    - Date recorded
    - Total number of records of that organism across the iNaturalist database
  - Users can search the table for results using the following filters:
    - Range bar determining the maximum number of records that displayed organisms should have
    - Textual search bar
  - Summary charts:
    - A bar graph reporting the numbers of creature observations recorded for each month of the current year
    - A dot plot displaying a maximum of thirty most recent records for the least recorded organism in the table
      - Records are categorized into either "Casual," "Needs ID," or "Research Grade" -- classifications in the iNaturalist database that describe the quality level of information each record presents or lacks
      - Hovering over a point shows the record's exact date and quality level
      - Clicking on a point redirects the user to the corresponding record on the iNaturalist site

![Dashboard view screenshot](public/site-screenshots/dashboard-view.png)
![Dashboard charts screenshot](public/site-screenshots/dashboard-charts.png)

- **Clicking on an organism's name in the dashboard creature table redirects the user to its matching detail view page**
  -  A creature's detail view page displays additional information about it, including:
    - Scientific name
    - Number of records
    - iNaturalist classification
      - The database categorizes organisms into various taxonomic classifications, ranging from broad kingdoms like Plantae (Plants) to more specific classes like Actinopterygii (Ray-finned Fishes).
      - iNaturalist taxa list: https://www.inaturalist.org/taxa
    - Location name (typically a country)
    - Coordinates (Longitude/Latitude format)
    - URL of the iNaturalist record
    - Default photo
    - A dot plot displaying a maximum of thirty most recent records for the organism
      - Records are categorized into either "Casual," "Needs ID," or "Research Grade" -- classifications in the iNaturalist database that describe the quality level of information each record presents or lacks
      - Hovering over a point shows the record's exact date and quality level
      - Clicking on a point redirects the user to the corresponding record on the iNaturalist site

![Creature view screenshot](public/site-screenshots/creature-view-top.png)
![Creature records dot plot screenshot](public/site-screenshots/creature-view-bottom.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple example steps.

### Prerequisites

Please update your npm tool.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andrebayucan/life-dashboard
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin https://github.com/github_username/repo_name.git
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DEMO EXAMPLES -->
## Demo

### Dashboard table, statistics, filtering, and charts

https://github.com/user-attachments/assets/004f3e64-c49b-4d93-82ba-1e35c75c39f2

### Creature page view

https://github.com/user-attachments/assets/f07c5738-dc70-40d7-998a-45e232ad3dc0

### Recent records dot plot interaction

https://github.com/user-attachments/assets/fd6d55b4-8a5d-41ce-97a5-80ef2622d382

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- License -->
## License

    Copyright [2026] [Andre Bayucan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

<!-- CONTACT -->
## Contact

Andre Bayucan - [LinkedIn](https://www.linkedin.com/in/andrebayucan) - andrebayucan@gmail.com

Project Link: https://github.com/andrebayucan/life-dashboard

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This project was one of the websites I created for CodePath's WEB102: Intermediate Web Development course. I used the public REST API provided by iNaturalist, linking its main website below.

* [iNaturalist](https://www.inaturalist.org/)
* [Netlify](https://www.netlify.com/)
* [CodePath](https://www.codepath.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
