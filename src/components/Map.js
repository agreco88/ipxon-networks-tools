import React, { useRef, useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5map from "@amcharts/amcharts5/map"
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

export default function Globe(props) {
  const chart = useRef(null)

  useEffect(() => {
    //Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    //Define colorset
    let colorset = am5.ColorSet.new(root, {})

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/

    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoEquirectangular(),
        panX: "rotateX",
        panY: "rotateY",
        rotationX: 80,
        rotationY: 5,
        rotationZ: 5,
        draggable: false,
        resizable: false,
        maxZoomLevel: 1,
        stroke: am5.color("#989E3C"),
        fill: am5.color("#FFF"),
        opacity: 1,
      })
    )

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    var backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    )

    //Background properties
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color("#0A053F"),
      strokeOpacity: 0,
    })

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    })

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color("#363564"),
        stroke: am5.color("#484960"),
        fillOpacity: 1,
        stroke: 1,
      })
    )

    polygonSeries.mapPolygons.template.setAll({
      // tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    })

    //Hover for countries
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#11C4D4"),
      opacity: 1,
    })

    // polygonSeries.mapPolygons.template.events.on("hit", function (ev) {
    //   // zoom to an object
    //   ev.target.series.chart.zoomToMapObject(ev.target)

    //   // get object info
    //   console.log(ev.target.dataItem.dataContext.name)
    // })

    // Create graticule series
    // https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
    // var graticuleSeries = chart.series.push(
    //   am5map.GraticuleSeries.new(root, {})
    // )
    // graticuleSeries.mapLines.template.setAll({
    //   strokeOpacity: 0.1,
    //   stroke: root.interfaceColors.get("alternativeBackground"),
    // })

    // Rotate animation
    chart.animate({
      key: "rotationX",
      from: 60,
      to: 180,
      duration: 120000,
      loops: Infinity,
    })

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))

    // Rotate animation
    // chart.animate({
    //   key: "rotationX",
    //   from: 0,
    //   to: 360,
    //   duration: 30000,
    //   loops: Infinity,
    // })
    pointSeries.bullets.push(function () {
      let container = am5.Container.new(root, {})
      let circle = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: am5.color("#11C4D4"),
          strokeOpacity: 0,
          stroke: 0.2,
          stroke: am5.color("#0A0F4F"),
        })
      )

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: am5.color("#11C4D4"),
          stroke: am5.color("#0A0F4F"),
          strokeOpacity: 1,
          tooltipText: "{title}",
        })
      )

      circle.animate({
        key: "scale",
        from: 1,
        to: 16,
        duration: 5000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      })
      circle.animate({
        key: "opacity",
        from: 1,
        to: 0,
        duration: 5000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      })
      return am5.Bullet.new(root, {
        sprite: container,
      })
    })

    let cities = [
      // {
      //   title: "Bogota",
      //   latitude: 4.6473,
      //   longitude: -74.0962,
      //   status: "NOT YET OPERATIONAL",
      // },
      // {
      //   title: "Ciudad de Mexico",
      //   latitude: 19.4271,
      //   longitude: -99.1276,
      // },
      {
        title: "Lima",
        latitude: -12.0931,
        longitude: -77.0465,
      },
      {
        title: "Quito",
        latitude: -0.2295,
        longitude: -78.5243,
      },
      // {
      //   title: "Panama",
      //   latitude: 8.9943,
      //   longitude: -79.5188,
      // },
      // {
      //   title: "Asuncion",
      //   latitude: -25.3005,
      //   longitude: -57.6362,
      // },
      // {
      //   title: "Montevideo",
      //   latitude: -34.8941,
      //   longitude: -56.0675,
      // },
      // {
      //   title: "Buenos Aires",
      //   latitude: -34.6118,
      //   longitude: -58.4173,
      // },
      // {
      //   title: "Brasilia",
      //   latitude: -15.7801,
      //   longitude: -47.9292,
      // },
    ]
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i]
      addCity(city.longitude, city.latitude, city.title)
    }

    function addCity(longitude, latitude, title) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
      })
    }

    // Make stuff animate on load
    chart.appear(1000, 100)
  }, [])

  return <div id="chartdiv" className="w-full h-full" />
}
