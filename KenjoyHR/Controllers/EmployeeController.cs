using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using KenjoyHR.Models.ED;
using System.IO;
using System.Web.Security;
using System.Web.UI.WebControls;
using KenjoyHR.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace KenjoyHR.Controllers
{
    [Authorize]
    public class EmployeeController : Controller
    {
        UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        private ApplicationUser cu=new ApplicationUser();
        private EmployeesEntities db = new EmployeesEntities();
      // var cc = Membership.GetAllUsers();   
           
        // GET: Employee
        public ActionResult Index( string searchString, string branch)
        {
            var currentuser = manager.FindById(User.Identity.GetUserId());
             
            
           
          
            if (currentuser.Branch=="Admin")
            {
                {
                    var hrs = db.HRs.AsQueryable();
                    if (!String.IsNullOrEmpty(searchString))
                    {
                        hrs = hrs.Where(s => s.LName.Contains(searchString)
                                               || s.FName.Contains(searchString));
                    }
                    if (!String.IsNullOrEmpty(branch))
                    {
                        hrs = hrs.Where(s => s.branch.Contains(branch));
                    }
                    return View(hrs.ToList());
                }
            }
            else
            {
                var hrs = db.HRs.AsQueryable().Where(x => x.branch == currentuser.Branch);
                if (!String.IsNullOrEmpty(searchString))
                {
                    hrs = hrs.Where(s => s.LName.Contains(searchString)
                                           || s.FName.Contains(searchString));
                }
                return View(hrs.ToList());
            }          
     }
        public ActionResult Index_bio(string searchString, string branch)
        {

            var currentuser = manager.FindById(User.Identity.GetUserId());
            if (currentuser.Branch == "Admin")
            {
                {
                    var hrs = db.HRs.AsQueryable();
                    if (!String.IsNullOrEmpty(searchString))
                    {
                        hrs = hrs.Where(s => s.LName.Contains(searchString)
                                               || s.FName.Contains(searchString));
                    }
                    if (!String.IsNullOrEmpty(branch))
                    {
                        hrs = hrs.Where(s => s.branch.Contains(branch));
                    }
                    return View(hrs.ToList());
                }
            }
            else
            {
                var hrs = db.HRs.AsQueryable().Where(x => x.branch == currentuser.Branch);
                if (!String.IsNullOrEmpty(searchString))
                {
                    hrs = hrs.Where(s => s.LName.Contains(searchString)
                                           || s.FName.Contains(searchString));
                }
                return View(hrs.ToList());
            }


          

        }

        // GET: Employee/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HR hR = db.HRs.Find(id);
            if (hR == null)
            {
                return HttpNotFound();
            }
            return View(hR);
        }
        [Authorize]
        public ActionResult DetailsDash(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HR hR = db.HRs.Find(id);
            if (hR == null)
            {
                return HttpNotFound();
            }
            return View(hR);
        }

        // GET: Employee/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FName,MName,LName,Gender,c_residence,address,m_number,email,d_work,r_status,m_status,n_kids,s_date,branch,title,salary,off_day,u_name,u_address,u_years,u_grad,degree,v_name,v_years,v_training,sa_name,sa_address,sa_years,so_name,so_address,so_years,p_name,p_address,nid_number,nssf,dr_li,dr_li_exp,pre_job,position,time,emp_name,emp_address,supervisor,last_day,emer_name,emer_number,image")] HR hR, HttpPostedFileBase img)
        {
            if (ModelState.IsValid)
            {
                if (img != null)
                {
                    var ImageName = Path.GetFileName(img.FileName);

                    var path = Server.MapPath(("~/Images/profile/") + ImageName);
                    img.SaveAs(path);
                    hR.image = img.FileName;
                    db.HRs.Add(hR);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                else
                {
                    db.HRs.Add(hR);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }

            return View(hR);
        }

        // GET: Employee/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HR hR = db.HRs.Find(id);
            if (hR == null)
            {
                return HttpNotFound();
            }
            return View(hR);
        }

        // POST: Employee/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FName,MName,LName,Gender,c_residence,address,m_number,email,d_work,r_status,m_status,n_kids,s_date,branch,title,salary,off_day,u_name,u_address,u_years,u_grad,degree,v_name,v_years,v_training,sa_name,sa_address,sa_years,so_name,so_address,so_years,p_name,p_address,nid_number,nssf,dr_li,dr_li_exp,pre_job,position,time,emp_name,emp_address,supervisor,last_day,emer_name,emer_number,image")] HR hR, HttpPostedFileBase img_e)
        {
            if (ModelState.IsValid)
            {
                if (img_e != null)
                {
                    string ImageName = Path.GetFileName(img_e.FileName);
                    var path = Server.MapPath(("~/Images/profile/") + ImageName);
                    img_e.SaveAs(path);
                    hR.image = img_e.FileName;

                    db.Entry(hR).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                else
                {
                    var q = from item in db.HRs.Where(u => u.Id == hR.Id) select item.image;
                    hR.image = q.First();
                    db.Entry(hR).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            return View(hR);
        }

        // GET: Employee/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HR hR = db.HRs.Find(id);
            if (hR == null)
            {
                return HttpNotFound();
            }
            return View(hR);
        }

        // POST: Employee/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            HR hR = db.HRs.Find(id);
            db.HRs.Remove(hR);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
