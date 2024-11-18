/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g8s34p2xb67sagf",
    "created": "2024-11-06 02:52:22.476Z",
    "updated": "2024-11-06 02:52:22.476Z",
    "name": "threads",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "erx0kjzk",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "cp1tha0z",
        "name": "article_title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 60,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "b9plrpei",
        "name": "article_body",
        "type": "editor",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g8s34p2xb67sagf");

  return dao.deleteCollection(collection);
})
