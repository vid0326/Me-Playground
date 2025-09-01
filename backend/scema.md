# Database Schema

## Profiles Collection

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "education": [
    {
      "institution": "String",
      "degree": "String",
      "year": "Number"
    }
  ],
  "projects": [
    {
      "type": "ObjectId",
      "ref": "Project"
    }
  ],
  "skills": [
    {
      "name": "String",
      "level": "Number" // 1-10
    }
  ],
  "work": [
    {
      "company": "String",
      "role": "String",
      "start": "Date",
      "end": "Date"
    }
  ],
  "links": {
    "github": "String",
    "linkedin": "String",
    "leetcode": "String"
  }
}
```

## Projects Collection

```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "links": ["String"],
  "skills": ["String"]
}
