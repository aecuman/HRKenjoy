using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using KenjoyHR.Models.ED;

namespace KenjoyHR.Controllers
{
    public class LossesController : ApiController
    {
        private EmployeesEntities db = new EmployeesEntities();

        // GET: api/Losses
        public IQueryable<Loss> GetLosses()
        {
            return db.Losses;
        }

        // GET: api/Losses/5
        [ResponseType(typeof(Loss))]
        public IHttpActionResult GetLoss(int id)
        {
            Loss loss = db.Losses.Find(id);
            if (loss == null)
            {
                return NotFound();
            }

            return Ok(loss);
        }

        // PUT: api/Losses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLoss(int id, Loss loss)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loss.Id)
            {
                return BadRequest();
            }

            db.Entry(loss).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LossExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Losses
        [ResponseType(typeof(Loss))]
        public IHttpActionResult PostLoss(Loss loss)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Losses.Add(loss);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = loss.Id }, loss);
        }

        // DELETE: api/Losses/5
        [ResponseType(typeof(Loss))]
        public IHttpActionResult DeleteLoss(int id)
        {
            Loss loss = db.Losses.Find(id);
            if (loss == null)
            {
                return NotFound();
            }

            db.Losses.Remove(loss);
            db.SaveChanges();

            return Ok(loss);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LossExists(int id)
        {
            return db.Losses.Count(e => e.Id == id) > 0;
        }
    }
}