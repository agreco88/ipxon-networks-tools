import React, { useRef, useEffect } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

function Map(props) {
  console.log(props)
  const chart = useRef(null)

  useEffect(() => {
    //////////////////////////////////////////
    //                                      //
    // MAP CREATION & ZOOM AND PAN CONTROLS //
    //                                      //
    //////////////////////////////////////////
    //Create Map instance
    let map = am4core.create("chartdiv", am4maps.MapChart)
    //Disable panning and zooming
    map.seriesContainer.draggable = false
    map.seriesContainer.resizable = false
    map.seriesContainer.align = "top"
    map.responsive.enabled = true

    map.maxZoomLevel = 1
    //Set map defitnition (Quality)
    map.geodata = am4geodata_worldLow
    //Setmap projection (Shape)
    map.projection = new am4maps.projections.Miller()

    ////////////////////////////////////////////////////////////
    //                                                        //
    // MAP AREAS (countries, states, etc.) - (polygonsSeries) //
    //                                                        //
    ////////////////////////////////////////////////////////////
    // Map areas (countries, states, etc.) are represented by MapPolygonSeries objects.
    let polygonSeries = new am4maps.MapPolygonSeries()
    //Load geographical data geographical data defining the curvature of the map areas
    polygonSeries.useGeodata = true
    map.series.push(polygonSeries)
    //Exclude Antarctica and include CX Points of Prescense
    polygonSeries.exclude = ["AQ"]

    //Load countries (Props)
    // console.log("Map props:", props.countries);
    polygonSeries.data = props.sites

    //Configure base MapPolygons (COUNTRIES)
    let countries = polygonSeries.mapPolygons.template
    countries.tooltipText = "{name} ({id})"
    countries.fill = am4core.color("#484848")
    countries.stroke = am4core.color("black")

    //Country active/hover states for countries
    let hoverCountry = countries.states.create("hover")
    hoverCountry.properties.opacity = 0.5
    var activeCountry = countries.states.create("active")
    activeCountry.properties.opacity = 0.5

    //Onclick for countries (polygons)
    var currentActive
    countries.events.on("hit", function (ev) {
      // let countryCode = ev.target.dataItem.dataContext.id
      // if (excludedCountries.includes(countryCode)) {
      //   // console.log("No data for:", countryCode);
      // } else {
      //   if (currentActive) {
      //     currentActive.isActive = false
      //   }
      //   currentActive = ev.target
      //   currentActive.isActive = true
      //   let countryToZoom = polygonSeries.getPolygonById(countryCode)
      //   // console.log("countryToZoom", countryToZoom);
      //   map.zoomToMapObject(countryToZoom)
      //   props.handleCountryChange(countryCode)
      // }
    })

    //
    //
    //Configure base MapImageSeries (SITES)
    var sites = map.series.push(new am4maps.MapImageSeries())
    //Load sites from props
    // sites.data = props.sites
    //Bind props properties with marker properties
    sites.mapImages.template.propertyFields.longitude = "longitude"
    sites.mapImages.template.propertyFields.latitude = "latitude"
    sites.mapImages.template.tooltipText = "{name}"
    sites.data = [
      {
        latitude: -31.4201,
        longitude: -64.1888,
        title: "Córdoba",
      },
      {
        latitude: -34.6037,
        longitude: -58.3816,
        title: "Buenos Aires",
      },
      {
        latitude: -34.9011,
        longitude: -56.1645,
        title: "Montevideo",
      },
      {
        latitude: -12.0464,
        longitude: -77.0428,
        title: "Lima",
      },
      {
        latitude: -0.1807,
        longitude: -78.4678,
        title: "Quito",
      },
      {
        latitude: 4.711,
        longitude: -74.0721,
        title: "Bogotá",
      },
      {
        latitude: 30.1588,
        longitude: 77.0428,
        title: "Panama City",
      },
      {
        latitude: 19.1332,
        longitude: -99.0428,
        title: "Ciudad de México",
      },
      {
        latitude: 20.6597,
        longitude: -103.3496,
        title: "Guadalajara",
      },
      {
        latitude: 25.7617,
        longitude: -80.1918,
        title: "Miami",
      },
      {
        latitude: -33.4489,
        longitude: -70.6693,
        title: "Santiago de Chile",
      },
      {
        latitude: 45.3151,
        longitude: -73.8779,
        title: "Beauharnois",
      },
      {
        latitude: -23.5558,
        longitude: -46.6396,
        title: "Sao Paulo",
      },
      {
        latitude: -25.2637,
        longitude: -57.5759,
        title: "Asunción",
      },
      {
        latitude: 14.6349,
        longitude: -90.5069,
        title: "Guatemala City",
      },
      {
        latitude: 14.8497,
        longitude: -89.1468,
        title: "Copan",
      },
      {
        latitude: 13.6929,
        longitude: -89.2182,
        title: "San Salvador",
      },
      {
        latitude: 9.9281,
        longitude: -84.0907,
        title: "San Jose",
      },
    ]
    //
    //
    //

    //Create site template
    let site = sites.mapImages.template
    //Create marker icon (Sprite) for each site
    let markerIcon = site.createChild(am4core.Circle)
    markerIcon.radius = 4
    markerIcon.fill = am4core.color("#AE1F5F")
    markerIcon.stroke = am4core.color("#FFFFFF")
    markerIcon.strokeWidth = 2
    markerIcon.nonScaling = true
    markerIcon.tooltipText = "{title}"
    markerIcon.propertyFields.fill = "color"

    // markerIcon.path =
    //   "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    markerIcon.width = 25
    markerIcon.height = 25
    markerIcon.nonScaling = true
    markerIcon.horizontalCenter = "middle"
    markerIcon.verticalCenter = "bottom"
    markerIcon.propertyFields.fill = "color"
    markerIcon.stroke = "1"
    //Onclick for sites (TODO MODAL HERE)
    site.events.on("hit", function (ev) {
      // console.log(ev.target.dataItem.dataContext);
    })

    chart.current = map
    return () => {
      map.dispose()
    }
  }, [])

  return (
    <div
      id="chartdiv"
      className="w-full flex self-start h-96 z-0 hidden sm:flex"
    />
  )
}

export default Map
