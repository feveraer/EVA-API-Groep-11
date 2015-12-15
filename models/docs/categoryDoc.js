/**
 * @api {get} /categories/:id/challenges Request challenges from category
 * @apiName GetCategoryChallenges
 * @apiGroup Category
 *
 * @apiParam {Number} id Category's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *       [
 *           {
*               "_id": "562ba076ce597a91722bab2f",
*               "title": "Uitdaging #2",
*               "description": "Uitleg voor uitdaging #2",
*               "difficulty": 2,
*               "category": {
*                   "_id": "562ba076ce597a91722bab2c",
*                   "name": "Dinner",
*                   "__v": 0
*               },
*               "__v": 0
*           },
 *           {
*               "_id": "562ba076ce597a91722bab43",
*               "title": "Uitdaging #22",
*               "description": "Uitleg voor uitdaging #22",
*               "difficulty": 3,
*               "category": {
*                   "_id": "562ba076ce597a91722bab2c",
*                   "name": "Dinner",
*                   "__v": 0
*               },
*               "__v": 0
*           }
 *       ]
 */