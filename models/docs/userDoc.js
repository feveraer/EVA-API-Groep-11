/**
 * @api {get} /user/:userId/tasks Request tasks from user
 * @apiName GetUserTasks
 * @apiGroup User
 *
 * @apiParam {Number} userId User's unique ID.
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

/**
 * @api {put} /user/:userId/tasks/:taskId Update task from user
 * @apiName UpdateUserTask
 * @apiGroup User
 *
 * @apiParam {Number} userId User's unique ID.
 * @apiParam {Number} taskId Task's unique ID.
 *
 * @apiHeaderExample {json} Request-Example:
 *      {
 *          "Content-Type": "application/json"
 *      }
 *
 * @apiSuccessExample Body-Example:
 *      {
 *          "status" : 2
 *      }
 */