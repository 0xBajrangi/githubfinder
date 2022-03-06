import React from 'react'
const footerYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="footer p-8 bg-gray-700 text-primary-content footer-center ">
          <div>
              <p>Copyright &copy; {footerYear} All rights reserved.</p>
        </div>
      
    </footer>
  )
}
