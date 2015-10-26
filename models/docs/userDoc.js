/**
 * @api {get} /user/:id/tasks Request tasks from user
 * @apiName GetUserTasks
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      [
 *          {
 *              "dueDate": "2015-10-20T15:15:02.676Z",
 *              "challenge": {
 *                  "_id": "562ba076ce597a91722bab30",
 *                  "title": "Uitdaging #3",
 *                  "description": "Uitleg voor uitdaging #3",
 *                  "difficulty": 1,
 *                  "category": "562ba076ce597a91722bab2a",
 *                  "__v": 0
 *              },
 *              "_id": "562ba076ce597a91722bab61",
 *              "completed": false
 *          },
 *          {
 *              "dueDate": "2015-10-21T15:15:02.677Z",
 *              "challenge": {
 *                  "_id": "562ba076ce597a91722bab30",
 *                  "title": "Uitdaging #3",
 *                  "description": "Uitleg voor uitdaging #3",
 *                  "difficulty": 1,
 *                  "category": "562ba076ce597a91722bab2a",
 *                  "__v": 0
 *              },
 *              "_id": "562ba076ce597a91722bab60",
 *              "completed": false
 *          }
 *      ]
 */