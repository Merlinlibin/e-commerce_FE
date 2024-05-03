import React from "react";

function Footer() {
  return (
    <div>
      <footer class="text-center text-lg-start  text-white bg-dark pt-3 ">
        <section class="d-none d-lg-block">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <img
                  src="https://nuzox.in/public/images/logo.png"
                  class="w-100 mb-3 foot-img "
                  style={{ filter: "brightness(0) invert(1)" }}
                  alt=""
                />
                <p>
                  We offers unlimited options for online shopping which makes it
                  one of the best Indian sites for online shopping.
                </p>
              </div>

              <div class="col-md-3 col-lg-2 col-xl-2 f-opp mx-auto mb-4">
                <h6 class="text-uppercase  fw-bold mb-4">Categories</h6>
                <p>
                  <a href="" class="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="" class="text-reset">
                    T Shirts
                  </a>
                </p>
                <p>
                  <a
                    href=""
                    class="text-reset">
                    Track Pants
                  </a>
                </p>
                <p></p>
                <a href="" class="text-reset">
                  Casual Pant
                </a>
                <p></p>
                <p></p>
                <a href="" class="text-reset">
                  Cargo Pant
                </a>
              </div>

              <div class="col-md-3 col-lg-2 col-xl-2 f-opp mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">MORE INFO</h6>
                <p>
                  <a
                    href=""
                    target="_blank"
                    class="text-reset">
                    About
                  </a>
                </p>

                <p>
                  <a
                    href=""
                    target="_blank"
                    class="text-reset">
                    Returns &amp; Refunds
                  </a>
                </p>
                <p>
                  <a
                    href=""
                    target="_blank"
                    class="text-reset">
                    Shipping Policy
                  </a>
                </p>
                <p>
                  <a
                    href=""
                    target="_blank"
                    class="text-reset">
                    Contact
                  </a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 f-opp">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <a href="" class="text-white">
                    <i class="fas fa-envelope me-2 "></i>
                    help@123.in
                  </a>
                </p>
                <p>
                  <a
                    href=""
                    target="_blank"
                    class="text-white">
                    <i class="fab fa fa-whatsapp  fn-i me-2 "></i> 1234567890
                  </a>
                </p>

                <p style={{ paddingLeft: "10px" }}>
                  Tamil Nadu, 123456
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          class="text-center p-4 d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}>
          Copyright © 2023 NEXT ZONE All rights reserved.
          <a href="#" target="_blank" class=" fw-bold">
            INDIAN DIGITAL
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
