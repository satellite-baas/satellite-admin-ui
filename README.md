# Satellite Admin UI

This repository contains the Admin UI for a **Satellite** user.

In here, a user can:

- View all satellites;
- Create new satellite;
- Destroy satellites;
- Check health of selected satellite;
- Upload static files to be hosted;
- View API key and endpoint of selected satellite;
- Explore GraphQL schema;
- Update GraphQL schema;

## Authentication

In order to use the Admin UI, you must authenticate at `/login`. If you are not registered yet, go to `/register` and type in a valid email address and password.

## Dashboard

The Dashboard has several components. In the header at the top of the screen, you can view all of your satellites in the dropdown menu. You can also create a new satellite by clicking the `Launch New Satellite` button directly next to the dropdown menu. Finally, you can also log out.

In the sidebar, you can navigate to any of the components:

- Home;
- Schema Explorer;
- Schema Manager;
- Static File Manager;

`Home` is where you can find information about your satellite and destroy it.

`Schema Explorer` is where you can explore your defined GraphQL schema through the GraphiQL interface.

`Schema Manager` is where you can easily update your GraphQL schema.

`Static File Manager` is where you can upload files for frontend hosting.

## Schema Explorer

Use this component to make queries and mutations against your satellite. 

> NOTE: This is not a sandbox environment. Mutations that are sent here **will** be persisted in the database.

## Schema Manager

Use this component to update your schema.

## Static File Manager

Any files that you want to be hosted by the current satellite can be uploaded and destroyed here.
