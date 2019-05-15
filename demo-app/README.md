# TRHC Dogs

This app allows trhc team members to share pictures of their dogs by breed category.

## Features

* List of Dogs by Breed
* Random Dog Pic
* Submit a Dog pic

## JSON Schema

```
{
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string', description: 'name of dog' },
    breed: { type: 'string'},
    avatar: { type: 'string'},
    images: { 
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          date: { type: 'string' },
          description: {type: 'string'}
        }
      }
    }
  }
}
```

 
