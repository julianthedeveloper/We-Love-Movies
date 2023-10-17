const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
  }
  

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }


  function update(updatedReview) {
    return knex("reviews as r")
        .select("r.*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "r.*");
  }

  const addCritic = mapProperties({
    critic_critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname:  "critic.surname",
    organization_name: "critic.organization_name",
    critic_created_at: "critic.created_at",
    critic_updated_at: "critic.updated_at"
});

  function returnUpdate(review_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "r.critic_id")
    .select("r.*", "c.*", "c.created_at AS critic_created_at", "c.updated_at AS critic_updated_at", "c.critic_id AS critic_critic_id")
    .where({"r.review_id": review_id})
    .first()
    .then(addCritic);
  }


module.exports = {
    read,
    update,
    returnUpdate,
    destroy
}