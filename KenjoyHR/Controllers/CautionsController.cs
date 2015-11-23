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
    public class CautionsController : ApiController
    {
        private EmployeesEntities db = new EmployeesEntities();

        // GET: api/Cautions
        public IQueryable<Caution> GetCautions()
        {
            return db.Cautions;
        }

        // GET: api/Cautions/5
        [ResponseType(typeof(Caution))]
        public IHttpActionResult GetCaution(int id)
        {
            Caution caution = db.Cautions.Find(id);
            if (caution == null)
            {
                return NotFound();
            }

            return Ok(caution);
        }

        // PUT: api/Cautions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCaution(int id, Caution caution)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != caution.Id)
            {
                return BadRequest();
            }

            db.Entry(caution).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CautionExists(id))
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

        // POST: api/Cautions
        [ResponseType(typeof(Caution))]
        public IHttpActionResult PostCaution(Caution caution)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cautions.Add(caution);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = caution.Id }, caution);
        }

        // DELETE: api/Cautions/5
        [ResponseType(typeof(Caution))]
        public IHttpActionResult DeleteCaution(int id)
        {
            Caution caution = db.Cautions.Find(id);
            if (caution == null)
            {
                return NotFound();
            }

            db.Cautions.Remove(caution);
            db.SaveChanges();

            return Ok(caution);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CautionExists(int id)
        {
            return db.Cautions.Count(e => e.Id == id) > 0;
        }
    }
}