import React, { useContext } from "react";
import "./Login.scss";
import { Container, Button, Card, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivacyPolicy() {
  const { login, facebookLogin } = useContext(AuthContext);

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3 className="text-center">Privacy Policy</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            mollis nisl ut augue malesuada consequat. Nulla molestie ante sed
            ante scelerisque convallis laoreet a orci. Curabitur fringilla purus
            eget mattis elementum. Vestibulum ac pharetra risus. Vivamus metus
            felis, aliquet eu urna at, ultricies lacinia purus. Proin sodales
            turpis vel est fringilla, eu volutpat orci consectetur. Vestibulum
            commodo, metus at euismod condimentum, orci diam sollicitudin
            tellus, nec vehicula mauris lacus tincidunt nunc. Aliquam volutpat
            elementum pellentesque. Nullam in tempus lorem, quis eleifend dui.
            Integer risus nisl, finibus molestie arcu eget, viverra vulputate
            dolor. Nulla feugiat dapibus sem, non tempor orci ullamcorper id.
            Fusce porta elit vel dui volutpat, a ultrices dolor sagittis.
            Pellentesque at mauris tempus, rutrum urna vitae, porta enim. Nam
            imperdiet a quam ut maximus.
          </p>
          <p></p>
          <p>
            Cras mollis, orci consectetur porttitor tristique, sem orci mattis
            massa, ac imperdiet nulla enim luctus nibh. In consequat tellus
            porttitor, posuere libero quis, lacinia mauris. In hac habitasse
            platea dictumst. In pretium non tellus id tristique. Aliquam magna
            nibh, malesuada eu blandit mollis, bibendum mollis est. Pellentesque
            tincidunt nec lacus in bibendum. Quisque euismod sapien vitae
            finibus volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Fusce vulputate ornare nunc quis congue.
          </p>
          <p>
            Ut risus tellus, pharetra id porta in, vehicula eu nisl. Duis nec
            est sodales, imperdiet magna id, sodales libero. Phasellus nec
            efficitur velit, vitae pharetra lorem. Phasellus malesuada id dolor
            ut euismod. Vestibulum nec quam mauris. Morbi ut nulla nec quam
            porttitor facilisis. Fusce pretium cursus libero ut vulputate. Duis
            eleifend tristique ex, vitae maximus diam ultrices at. Sed sed
            luctus ex. Donec porta iaculis quam a tempor. Aliquam erat volutpat.
            Duis nec accumsan libero. Fusce fermentum enim at vestibulum auctor.
          </p>
          <p>
            Duis nec ultrices eros. Duis mollis diam eget mauris condimentum,
            quis congue enim facilisis. Pellentesque non nisl nec dolor
            dignissim placerat. Nulla consequat ultrices feugiat. Nullam
            ultricies quam commodo tellus malesuada elementum. Mauris tempor,
            neque vel congue laoreet, turpis diam posuere lacus, eget porttitor
            magna justo sed metus. In eget egestas odio.
          </p>
          <p>
            Fusce vulputate, odio vel tincidunt blandit, dolor mi euismod arcu,
            vitae volutpat mauris erat sit amet mi. Duis pharetra magna ut est
            hendrerit, sit amet interdum felis gravida. Praesent ac euismod
            enim. In in rhoncus nisi. Duis ac ante vitae lacus eleifend varius
            nec in tellus. Aenean et ultricies sem. Quisque eleifend auctor nisl
            et hendrerit. Morbi metus enim, laoreet sit amet dictum eu,
            ullamcorper vel metus. Morbi nec tellus dolor. Ut tempor eros nec
            varius euismod. Fusce placerat at enim quis gravida. Cras viverra
            arcu non ante dignissim sollicitudin. Sed sed lacinia odio. Donec
            pharetra lorem at ligula tincidunt posuere.{" "}
          </p>
        </div>
      </Row>
    </Container>
  );
}
