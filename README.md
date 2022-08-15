The site is available here: https://minisofa-project.vercel.app
(If there happens to be a 500 internal server error, that means that the data from the API has been blocked for us and will automatically be fixed when some time passes)


General story representing user flow: The user comes to the application and sees the list of categories fetched. Users can then navigate to the category page of the desired category. On the category page, users can see events available for the selected category. Users can refresh the browser and the same category page should be displayed (category page has a separate route describing specific category). From the category page, users can navigate to the specific event details page. On the event, details page the user can find detailed data associated with the event.

User stories are sentences from the user's perspective. They can be pictured as user's requirements because they don't specify the technical side of the project. The technical side is left to the developers (this includes design too).

User stories are bellow: Stories in the bold are required, stories in the italic are a further improvement, developers will decide if any of them should be implemented. You can also add extra stories which you think are fitting.

Stories:
General UI
User should be able to use the app on the mobile device
User should be able to use the app on the computer screen
User can change application visual theme (dark / light)
Sport page (Category List Page)
User can see all football categories for today (time zone UTC+2 - 7200s offset)
User can click on the category and open/close category accordion to see/hide category events
User can click on the event and navigate to event page
User can click on category name to open category page
User can add/remove event(s) to Tracked events
User can change the date for the category list (e.g. yesterday, today, tomorrow)
User can change the sport of the page (e.g. tennis, ice-hockey or basketball)
Technical note: you can implement sport page using either a) sport scheduled events route and grouping data on the frontend or b) category list and category events route. Pick the option which works the best for your layout and features.

Category Page
User can see all unique tournaments and events from the selected category on that date
User can click on the event and navigate to event page
User can add/remove event(s) to Tracked events
Event Page
User can see teams playing in the event, score (if exists), date and time
User can see event statistics
User can see event extra information (e.g. venue info, referee, ...)
User can add/remove event(s) to Tracked events
User can see extra information about the event's unique tournament
Tracked Events Page
User can see all tracked events
User can remove event(s) from Tracked events
General features
User can always see score and teams participating in the last 5 tracked events (e.g. at the bottom of the screen, on all pages)
