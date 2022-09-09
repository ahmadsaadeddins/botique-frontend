import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";

// My imports
import { useFetch } from "helpers";
import { api } from "api";
import { convertToArabic } from "helpers";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";

const useStyles = makeStyles(styles);

export default function SectionLatestOffers() {
  const { data } = useFetch(api.items.items);

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Typography variant="h2" style={{ textAlign: "right" }}>
          آخر العروض
        </Typography>
        <GridContainer>
          {data &&
            data.map((item, idx) =>
              idx < 3 ? (
                <GridItem key={item.id} md={4} sm={4}>
                  <Card product plain>
                    <CardHeader image plain>
                      <a href="#pablo">
                        <img src={item.image} alt={item.description} />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${item.image})`,
                          opacity: 1,
                        }}
                      />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                      <h4 className={classes.cardTitle}>{item.name}</h4>
                      <p className={classes.cardDescription}>
                        {item.description}
                      </p>
                    </CardBody>
                    <CardFooter plain>
                      <div className={classes.priceContainer}>
                        <span
                          className={classNames(
                            classes.price,
                            classes.priceOld
                          )}
                        >
                          {convertToArabic(item.price * 3)} {"جنيه"}
                        </span>
                        <span
                          className={classNames(
                            classes.price,
                            classes.priceNew,
                            classes.paddingLeft
                          )}
                        >
                          {convertToArabic(Math.floor(item.price))} {"جنيه"}
                        </span>
                      </div>
                      <div
                        className={classNames(classes.stats, classes.mlAuto)}
                      >
                        <Tooltip
                          id="tooltip-top"
                          title="Saved to Wishlist"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button justIcon simple color="rose">
                            <Favorite />
                          </Button>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              ) : null
            )}
        </GridContainer>
      </div>
    </div>
  );
}
