# Eva api #

## GET ##
_id: unique id automatically generated

### All ###

- users: ```api/users```
- user with tasks populated: ```api/users?populate=task.challenges```
- challenges: ```api/challenges```
- select challenges with difficulty 2: ```api/challenges?difficulty=2```

### Specific ###

- user: ```api/users/id```
- user with tasks populated: ```api/users/_id?populate=task.challenges```
- tasks for a specific user: ```api/users/_id/tasks```
- challenge: ```api/challenges/id```

## POST/PUT ##

### User ###

*post :* ```api/users```

*header :* ```Content-Type: application/json```

*raw body:*


```
#!text
{
  "email": "bert.beerens@gmail.com",
  "token": "12345679abc",
  "loginType": "google",
  "tasks": [
    {
      "dueDate": "2015-10-15T08:03:42.728Z",
      "challenge": {
        "title": "Eet muesli als ontbijt",
        "description": "Begin met het opwarmen van...",
        "difficulty": 1
      },
      "completed": 1
    },
    {
      "dueDate": "2015-10-15T08:03:42.728Z",
      "challenge": {
        "title": "Eet muesli als ontbijt",
        "description": "Begin met het opwarmen van...",
        "difficulty": 1
      },
      "completed": 1
    }
  ]
}
```

### Challenge ###

*post :* ```api/challenges```

*header :* ```Content-Type: application/json```

*raw body:*


```
#!text
{
    "title": "Eet muesli als ontbijt",
    "description": "Begin met het opwarmen van...",
    "difficulty": 1,
}
```