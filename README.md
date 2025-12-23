## Overview

<span style="font-size: larger;">
Fish-spots is a website where new and old fishermen can check if their fish spot is visitable.
</span>
</br>
<span style="font-size: larger;">
You will find the weather information about the current day and the next 4 days. The information shown is [degrees, feels like, wind direction and wind speed].
</span>
</br>
<span style="font-size: larger;">
You can view all the provided fishing spots for the north and south regions.There is google maps link with short text description about the fish spot.
</span>
</br>

## Details

**Frontend**

- **Stack**: React, Tailwind CSS.
- **Description**: The frontend is entirely built with React. It uses Tailwind CSS to efficiently set styles.

**Backend**

- **Stack**: Django-rest, PostgreSQL, Redis
- **Third-Party-Packages**: Celery, Simple JWT
- **Description**: Using celery to create tasks which are executed every 3 hours to update the database with the new weather data and then cache it. Added simple login/register system.
