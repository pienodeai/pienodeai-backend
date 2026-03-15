/** Single OpenAPI 3.0 spec for Swagger UI – one source, no duplicate APIs. */
export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "PiNodeAI Backend API",
    version: "1.0.0",
    description: "API for PiNodeAI website (contact, health).",
  },
  servers: [{ url: "/", description: "Current host" }],
  tags: [
    { name: "Health", description: "Liveness and readiness probes" },
    { name: "Contact", description: "Contact form / lead submission" },
  ],
  paths: {
    "/health/live": {
      get: {
        tags: ["Health"],
        summary: "Liveness",
        description: "Returns 200 if the process is running.",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { type: "object", properties: { status: { type: "string", example: "ok" } } },
              },
            },
          },
        },
      },
    },
    "/health/ready": {
      get: {
        tags: ["Health"],
        summary: "Readiness",
        description: "Returns 200 if the service can accept traffic (e.g. DB reachable).",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { type: "object", properties: { status: { type: "string", example: "ok" } } },
              },
            },
          },
          "503": {
            description: "Unhealthy",
            content: {
              "application/json": {
                schema: { type: "object", properties: { status: { type: "string" } } },
              },
            },
          },
        },
      },
    },
    "/api/v1/contact": {
      post: {
        tags: ["Contact"],
        summary: "Submit contact form",
        description: "Submit a contact/lead with name, email, and message.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "message"],
                properties: {
                  name: { type: "string", minLength: 2, example: "Jane Doe" },
                  email: { type: "string", format: "email", example: "jane@example.com" },
                  phone: { type: "string", nullable: true, example: "+1234567890" },
                  serviceInterest: { type: "string", nullable: true },
                  message: { type: "string", minLength: 10, example: "I would like to know more about your services." },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Lead created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Lead created successfully" },
                    id: { type: "string", description: "Created lead ID" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "VALIDATION_ERROR" },
                    message: { type: "string" },
                    details: { type: "object" },
                    requestId: { type: "string" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                    message: { type: "string" },
                    requestId: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
