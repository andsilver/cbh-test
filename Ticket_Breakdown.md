# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### ticket #1. Update Agent model to have new field named `custom_id`. (1hr) - Easy
- `custom_id` can be updated whenever the Facility wants
- It can be null and should be alphanumeric characters only. Return the response with `Invalid Custom Id` message if it's invalid
- Return `custom_id` included in Agent metadata when requested

You have to add `custom_id` field in Agent model, validate the value before the data is processed and update relevant API controllers.

#### ticket #2. Update the Agent form in the page. (45mins) - Medium
- Facility can save the `custom_id` when adding new agent or update it later in the Agent create/edit page
- `custom_id` value must be alphanumeric characters or null only.

You need to add `custom_id` field in the Agent form, add validation and update payload in the request.

### ticket $3. Use the new field, `custom_id` for Facility to generate report. (1hr) - Easy
- If any Agent's `custom_id` is null, show the modal to ask for the Facility to use the Agent's internal id or give custom id to Agents when they generate report. Display Agents' names in the modal to point out them which Agents they should give custom id to.
- Call the `generateReport` function with Shifts with Agent metadata that includes `custom_id`int it
- Use `custom_id` when generating PDF report instead internal id

It's pretty clear here, once you receive the Shifts info including agent metadata with `custom_id` when `getShiftsByFacility` function is called, You can call the `generateReport` function with Shifts info and use agent's `custom_id` instead internal database id.