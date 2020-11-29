import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";
import Cached from "@material-ui/icons/Cached";
import Check from "@material-ui/icons/Check";
// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import { useFetch } from "helpers";
import { api } from "api";
import { convertToArabic } from "helpers";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts() {
  const { data: dataCategory } = useFetch(api.items.category);

  const dataCategoryIds = dataCategory && dataCategory.map((item) => item.id);
  const [checked, setChecked] = React.useState(dataCategoryIds);
  const [priceRange, setPriceRange] = React.useState([1, 20]);
  // const { data } = useFetch(api.items.items);
  // const { data: srchData } = useFetch(api.items.categorysrch(checked));
  const { data: srchD } = useFetch(api.items.srch(checked, priceRange));
  // const { data: PriceData } = useFetch(api.items.pricesrch(priceRange));
  console.log(srchD);
  React.useEffect(() => {
    if (
      !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {
      Slider.create(document.getElementById("sliderRegular"), {
        start: priceRange,
        connect: true,
        range: { min: 1, max: 150 },
        step: 1,
        direction: "rtl",
      }).on("update", function (values) {
        setPriceRange([Math.round(values[0]), Math.round(values[1])]);
      });
    }
    return function cleanup() {};
  });
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      // console.log("after newChecked: ", checked);
    } else {
      newChecked.splice(currentIndex, 1);
      // console.log("after splice: ", checked);
    }
    setChecked(newChecked);
  };
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.textLeft}> المنتجات</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>
            <Card plain>
              <CardBody className={classes.cardBodyRefine}>
                <h4 className={classes.cardTitle + " " + classes.textLeft}>
                  اعادة ضبط الفلتر
                  <Tooltip
                    id="tooltip-top"
                    title="اعادة ضبط الفلتر"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      onClick={() => {
                        setChecked([]);
                        document
                          .getElementById("sliderRegular")
                          .noUiSlider.set([1, 20]);
                      }}
                      link
                      justIcon
                      size="sm"
                      className={classes.pullRight + " " + classes.refineButton}
                    >
                      <Cached />
                    </Button>
                  </Tooltip>
                  <Clearfix />
                </h4>
                <Accordion
                  active={[0, 2]}
                  activeColor="rose"
                  collapses={[
                    {
                      title: "حدود السعر",
                      content: (
                        <CardBody className={classes.cardBodyRefine}>
                          <span
                            className={classNames(
                              classes.pullLeft,
                              classes.priceSlider
                            )}
                          >
                            {convertToArabic(priceRange[0])}جنية
                          </span>
                          <span
                            className={classNames(
                              classes.pullRight,
                              classes.priceSlider
                            )}
                          >
                            {convertToArabic(priceRange[1])}جنية
                          </span>
                          <br />
                          <br />
                          <div id="sliderRegular" className="slider-rose" />
                        </CardBody>
                      ),
                    },
                    {
                      title: "النوع",
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            {dataCategory &&
                              dataCategory.map((category, idx) => {
                                return category.name ? (
                                  <FormControlLabel
                                    key={category.id}
                                    control={
                                      <Checkbox
                                        disableRipple
                                        tabIndex={-1}
                                        onClick={() =>
                                          handleToggle(category.id)
                                        }
                                        checked={
                                          checked.indexOf(category.id) !== -1
                                            ? true
                                            : false
                                        }
                                        checkedIcon={
                                          <Check
                                            className={classes.checkedIcon}
                                          />
                                        }
                                        icon={
                                          <Check
                                            className={classes.uncheckedIcon}
                                          />
                                        }
                                        classes={{
                                          checked: classes.checked,
                                          root: classes.checkRoot,
                                        }}
                                      />
                                    }
                                    classes={{ label: classes.label }}
                                    label={category.name}
                                  />
                                ) : null;
                              })}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem md={9} sm={9}>
            <GridContainer>
              {srchD
                ? srchD.map((item, idx) =>
                    idx < 6 ? (
                      <GridItem md={4} sm={4} key={item.id}>
                        <Card plain product>
                          <CardHeader noShadow image>
                            <a href="#pablo">
                              <img src={item.image} alt={item.description} />
                            </a>
                          </CardHeader>
                          <CardBody plain>
                            <a href="#pablo">
                              <h4 className={classes.cardTitle}>
                                رقم القطعه : {convertToArabic(item.id)}
                              </h4>
                            </a>
                            <p className={classes.description}>
                              {item.description}
                            </p>
                          </CardBody>
                          <CardFooter
                            plain
                            className={classes.justifyContentBetween}
                          >
                            <div className={classes.priceContainer}>
                              <span className={classes.price}>
                                {" "}
                                {convertToArabic(item.price)} {"جنيه"}
                              </span>
                            </div>
                            <Tooltip
                              id="tooltip-top"
                              title="Saved to Wishlist"
                              placement="left"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button
                                justIcon
                                simple
                                color="rose"
                                className={classes.pullRight}
                              >
                                <Favorite />
                              </Button>
                            </Tooltip>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    ) : null
                  )
                : null}
            </GridContainer>
          </GridItem>
        </GridContainer>
        <Button fullWidth round color="rose">
          شوف أكتر ....
        </Button>
      </div>
    </div>
  );
}
