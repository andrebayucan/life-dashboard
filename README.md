# Web Development Project 6 - *Life Dashboard*

Submitted by: **Andre Bayucan**

This web app: **Life Dashboard displays information regarding organism observations around the world, providing users with search filters and chart data.**

Time spent: **9** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset

The following **additional** features are implemented:

- [x] An organism's detail view displays a chart of its 30 most recent observations
  - [x] Clicking a point on this graph takes the user to the site url of the observation
- [x] Invalid pages display error messages
## Video Walkthrough

Here's a walkthrough of implemented user stories:

<video src="https://github.com/user-attachments/assets/f522b954-c22e-4ef3-875c-0888c2297695" autoplay loop muted playsinline></video>

<!-- Replace this with whatever GIF tool you used! -->
GIF created with QuickTime Player  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

The most difficult part of the process was figuring out how to graph my data with recharts. Within my chart components, I needed to reformat my data into arrays of objects and ensure that dates would be ordered chronologically. In OrganismObservations, I processed the dates by converting their ints to date names, shortening them to three letters, and sorting them using the toLocaleString() method. Although it continued to take trial and error to configure the formatting of my charts, I was able to read through the library's documentation and complete my data visualizations.

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