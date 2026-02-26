# Tally Counter REST API

A lightweight in-memory tally counter exposed via a REST API, built with Node.js, Express, and Winston.

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Running the Server

```bash
npm start
```

The server starts on port **3000** by default.

To stop the server gracefully, press `Ctrl+C`. The server will log a stopping event before exiting.

---

## API Endpoints

All endpoints use `GET` and return a JSON response containing the current counter value.

### `GET /counter-read`

Returns the current counter value without modifying it.

**Response**

```json
{ "count": 5 }
```

---

### `GET /counter-increase`

Increments the counter by one and returns the updated value.

**Response**

```json
{ "count": 6 }
```

---

### `GET /counter-reset`

Resets the counter to zero and returns `0`.

**Response**

```json
{ "count": 0 }
```

---

## Logging

Logs are written to stdout in the following format:

```
YYYY-MM-DD HH:mm:ss [LEVEL] MESSAGE
```

---

## Testing with rest.http

The `rest.http` file contains ready-made requests for all three endpoints. It is compatible with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for VS Code and JetBrains HTTP Client.

```http
### Read current counter value
GET http://localhost:3000/counter-read

### Increase counter by one
GET http://localhost:3000/counter-increase

### Reset counter to zero
GET http://localhost:3000/counter-reset
```

> **Note:** The counter state is held in memory and will reset whenever the server process is restarted.
