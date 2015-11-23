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
    public class AbsentController : ApiController
    {
        private EmployeesEntities db = new EmployeesEntities();

        // GET: api/Absent
        public IQueryable<Absent> GetAbsents()
        {
            return db.Absents;
        }

        // GET: api/Absent/5
        [ResponseType(typeof(Absent))]
        public IHttpActionResult GetAbsent(int id)
        {
            Absent absent = db.Absents.Find(id);
            if (absent == null)
            {
                return NotFound();
            }

            return Ok(absent);
        }

        // PUT: api/Absent/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAbsent(int id, Absent absent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != absent.Id)
            {
                return BadRequest();
            }

            db.Entry(absent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AbsentExists(id))
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

        // POST: api/Absent
        [ResponseType(typeof(Absent))]
        public IHttpActionResult PostAbsent(Absent absent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Absents.Add(absent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = absent.Id }, absent);
        }

        // DELETE: api/Absent/5
        [ResponseType(typeof(Absent))]
        public IHttpActionResult DeleteAbsent(int id)
        {
            Absent absent = db.Absents.Find(id);
            if (absent == null)
            {
                return NotFound();
            }

            db.Absents.Remove(absent);
            db.SaveChanges();

            return Ok(absent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AbsentExists(int id)
        {
            return db.Absents.Count(e => e.Id == id) > 0;
        }
    }
}