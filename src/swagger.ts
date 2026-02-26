const spec = {
  openapi: "3.0.3",
  info: {
    title: "PiNodeAI Backend API",
    description: "REST API for PiNodeAI website – services, portfolio, blog, team, contact & newsletter",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:3000", description: "Local" },
  ],
  paths: {
    "/api/v1/services": {
      get: {
        summary: "List all services",
        tags: ["Services"],
        responses: {
          "200": {
            description: "List of services",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Service" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/services/{slug}": {
      get: {
        summary: "Get service by slug",
        tags: ["Services"],
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Service", content: { "application/json": { schema: { $ref: "#/components/schemas/Service" } } } },
          "404": { description: "Service not found" },
        },
      },
    },
    "/api/v1/portfolio": {
      get: {
        summary: "List all case studies",
        tags: ["Portfolio"],
        responses: {
          "200": {
            description: "List of case studies",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/CaseStudy" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/portfolio/{slug}": {
      get: {
        summary: "Get case study by slug",
        tags: ["Portfolio"],
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Case study", content: { "application/json": { schema: { $ref: "#/components/schemas/CaseStudy" } } } },
          "404": { description: "Case study not found" },
        },
      },
    },
    "/api/v1/blog": {
      get: {
        summary: "List all blog posts",
        tags: ["Blog"],
        responses: {
          "200": {
            description: "List of blog posts",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/BlogPost" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/blog/{slug}": {
      get: {
        summary: "Get blog post by slug",
        tags: ["Blog"],
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Blog post", content: { "application/json": { schema: { $ref: "#/components/schemas/BlogPost" } } } },
          "404": { description: "Blog post not found" },
        },
      },
    },
    "/api/v1/team": {
      get: {
        summary: "List team members",
        tags: ["Team"],
        responses: {
          "200": {
            description: "List of team members",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/TeamMember" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/testimonials": {
      get: {
        summary: "List testimonials",
        tags: ["Testimonials"],
        responses: {
          "200": {
            description: "List of testimonials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Testimonial" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/faqs": {
      get: {
        summary: "List FAQs",
        tags: ["FAQs"],
        parameters: [
          {
            name: "category",
            in: "query",
            schema: { type: "string", enum: ["general", "services", "pricing", "process"] },
          },
        ],
        responses: {
          "200": {
            description: "List of FAQs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/FAQ" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/stats": {
      get: {
        summary: "Get company stats",
        tags: ["Stats"],
        responses: {
          "200": {
            description: "Company statistics",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/CompanyStat" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/config": {
      get: {
        summary: "Get company config",
        tags: ["Config"],
        responses: {
          "200": {
            description: "Company name, tagline, contact, social links",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CompanyConfig" },
              },
            },
          },
        },
      },
    },
    "/api/v1/contact": {
      post: {
        summary: "Submit contact form",
        tags: ["Contact"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ContactRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Message sent successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Message sent successfully" } },
                },
              },
            },
          },
          "400": { description: "Validation error" },
        },
      },
    },
    "/api/v1/newsletter": {
      post: {
        summary: "Subscribe to newsletter",
        tags: ["Newsletter"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NewsletterRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully subscribed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Successfully subscribed" } },
                },
              },
            },
          },
          "400": { description: "Validation error" },
        },
      },
    },
    "/health/live": {
      get: {
        summary: "Liveness probe",
        tags: ["Health"],
        responses: { "200": { description: "OK" } },
      },
    },
    "/health/ready": {
      get: {
        summary: "Readiness probe (checks MongoDB)",
        tags: ["Health"],
        responses: {
          "200": { description: "OK" },
          "503": { description: "Unhealthy" },
        },
      },
    },
  },
  components: {
    schemas: {
      Service: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          shortDescription: { type: "string" },
          icon: { type: "string" },
          benefits: { type: "array", items: { type: "string" } },
          process: {
            type: "array",
            items: {
              type: "object",
              properties: {
                step: { type: "number" },
                title: { type: "string" },
                description: { type: "string" },
              },
            },
          },
          featured: { type: "boolean" },
        },
      },
      CaseStudy: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          challenge: { type: "string" },
          solution: { type: "string" },
          results: { type: "array", items: { type: "string" } },
          image: { type: "string" },
          client: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          services: { type: "array", items: { type: "string" } },
          category: { type: "string" },
          featured: { type: "boolean" },
        },
      },
      BlogPost: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          author: {
            type: "object",
            properties: { name: { type: "string" }, image: { type: "string" } },
          },
          publishedAt: { type: "string" },
          image: { type: "string" },
          category: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          readingTime: { type: "number" },
          featured: { type: "boolean" },
        },
      },
      TeamMember: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          bio: { type: "string" },
          image: { type: "string" },
          social: {
            type: "object",
            properties: {
              linkedin: { type: "string" },
              twitter: { type: "string" },
              github: { type: "string" },
            },
          },
        },
      },
      Testimonial: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          company: { type: "string" },
          image: { type: "string" },
          quote: { type: "string" },
          rating: { type: "number" },
        },
      },
      FAQ: {
        type: "object",
        properties: {
          id: { type: "string" },
          question: { type: "string" },
          answer: { type: "string" },
          category: { type: "string", enum: ["general", "services", "pricing", "process"] },
        },
      },
      CompanyStat: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "number" },
          suffix: { type: "string" },
          prefix: { type: "string" },
        },
      },
      CompanyConfig: {
        type: "object",
        properties: {
          name: { type: "string" },
          tagline: { type: "string" },
          description: { type: "string" },
          contactInfo: { type: "object" },
          socialLinks: { type: "object" },
        },
      },
      ContactRequest: {
        type: "object",
        required: ["name", "email", "message"],
        properties: {
          name: { type: "string", minLength: 2 },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          serviceInterest: { type: "string" },
          message: { type: "string", minLength: 10 },
        },
      },
      NewsletterRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", format: "email" },
        },
      },
    },
  },
} as const;

export default spec;
