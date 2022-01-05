<template>
  <div>
    <div id="map">
      <ul id="category" style="padding-left: 0px">
        <li id="BK9" data-order="0">
          <span class="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1">
          <span class="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2">
          <span class="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3">
          <span class="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4">
          <span class="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span class="category_bg store"></span>
          편의점
        </li>
      </ul>
    </div>
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(1000)">show</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
const houseStore = "houseStore";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      marker: [],
      markers: [],
      Addr: [],
      Dong: [],
      index: 0,
      diplayContainer: [],
      infowindow: null,
      markerCategory: "",
      markersCategory: [], // 마커를 담을 배열입니다
      currCategory: "", // 현재 선택된 카테고리를 가지고 있을 변수입니다
      ps: "",
      id: "",
      placeOverlay: "",
      contentNode: "",
    };
  },
  created() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f0c98f5648ba4cc4eb3da2fd8333e3f9&libraries=services";
      document.head.appendChild(script);
    }
  },

  watch: {
    houses: function (object, old) {
      if (object != null) {
        console.log("감지했늬?");
        this.index = object.length;
        //console.log(object.length);
        //console.log(this.index);
        this.getAPTData();
      } else {
        console.log(old);
      }
    },
  },

  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    ...mapActions(houseStore, ["getHouseList"]),

    initMap() {
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          console.log(locPosition);
          // 마커와 인포윈도우를 표시합니다
          this.displayMarker(locPosition, message);

          console.log(locPosition);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = "geolocation을 사용할수 없어요..";

        this.displayMarker(locPosition, message);
      }

      // 장소 검색 객체를 생성합니다
      this.ps = new kakao.maps.services.Places(this.map);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      this.contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      this.addEventHandle(
        this.contentNode,
        "mousedown",
        kakao.maps.event.preventMap
      );
      this.addEventHandle(
        this.contentNode,
        "touchstart",
        kakao.maps.event.preventMap
      );
      // 커스텀 오버레이 컨텐츠를 설정합니다
      this.placeOverlay.setContent(this.contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      this.addCategoryClickEvent();
    },
    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }
      // const placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeCategoryMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        console.log(data);
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log(
          " 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요"
        );
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log(
          "에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요"
        );
      }
    },

    // 지도에 마커를 표출하는 함수입니다
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document
        .getElementById(this.currCategory)
        .getAttribute("data-order");

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        this.markerCategory = this.addMarker2(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        ((markerCategory, place) => {
          kakao.maps.event.addListener(markerCategory, "click", () => {
            this.displayPlaceInfo(place);
          });
        })(this.markerCategory, places[i]);
        console.log("places[]", places[0]);
      }
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker2(position, order) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );
      this.markerCategory = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

      this.markerCategory.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markersCategory.push(this.markerCategory); // 배열에 생성된 마커를 추가합니다

      return this.markerCategory;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      console.log(this.markers);
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
      console.log("removeMarker");
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeCategoryMarker() {
      for (var i = 0; i < this.markersCategory.length; i++) {
        this.markersCategory[i].setMap(null);
      }
      this.markersCategory = [];
      console.log("removeCategoryMarker");
    },

    // // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      // this.placeOverlay.setContent(this.contentNode);
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent() {
      var category = document.getElementById("category"),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = this.onClickCategory;
      }
    },

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    onClickCategory(event) {
      var id = event.currentTarget.id,
        className = event.currentTarget.className;
      // var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      // new kakao.maps.CustomOverlay({ zIndex: 1 }).setMap(null);
      this.placeOverlay.setMap(null);
      console.log("className:", className);
      console.log("id:", id);

      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeCategoryMarker();
      } else {
        this.currCategory = id;
        this.changeCategoryClass(this);
        this.searchPlaces();
      }
      console.log("onClickCategory");
    },

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    changeCategoryClass(el) {
      var category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }

      console.log("changeCategory");
    },

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(this.map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      this.map.setCenter(locPosition);
    },
    //---------------------카테고리 끝-----------

    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size / 2}px`;
      this.map.relayout();
    },

    // 아파트 데이터 가져오기
    getAPTData() {
      this.removeMarker();
      let building_code = 0;
      let building_sub_code = 0;
      let full_address = [];
      console.log("getAPTData");
      console.log(this.houses);
      for (var i = 0; i < this.houses.length; i++) {
        //배열에서 하나씩 꺼내서 주소만들기, 경도 위도를 위한
        building_code = Number.parseInt(this.houses[i]["도로명건물본번호코드"]);
        building_sub_code =
          Number.parseInt(this.houses[i]["도로명건물부번호코드"]) + "";
        console.log(building_code);
        if (building_sub_code != 0) {
          building_code += "-" + building_sub_code;
        }

        // searched_apt_list.push(
        //   parse_data[i]["법정동"] + " " + parse_data[i]["아파트"]
        // );
        full_address.push(
          this.houses[i]["법정동"] +
            " " +
            this.houses[i]["도로명"] +
            " " +
            building_code
        );

        this.Addr.push(
          this.houses[i]["법정동"] +
            " " +
            this.houses[i]["도로명"] +
            " " +
            building_code
        );

        this.Dong.push(this.houses[i]["법정동"]);

        console.log(building_code);
      }
      console.log("full_address");
      console.warn(full_address);
      this.movePosition(full_address[0]);
      //조회된 위치에 마커 표시
      for (let i = 0; i < full_address.length; i++) {
        this.setMark(full_address[i]);
      }
      //  displayPlaces(houses);
    },

    setMark(address) {
      // let markers = new Array();
      //주소를 좌표로 변환해 마커 찍기
      var geocoder = new kakao.maps.services.Geocoder();
      // var imageSrc = "img/my_position.png";
      // 마커 이미지의 이미지 크기
      // var imageSize = new kakao.maps.Size(30, 30);
      // 마커 이미지를 생성합니다
      // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          //coords->position list에 넣어주기(content = 인포윈도우에 들어갈 내용)
          //positions.push({"position": coords});

          var marker = new kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: coords, // 마커를 표시할 위치
            //content: positions[i].content, // 마커의 content, 마커에 마우스를 올리면 content가 표시됩니다
            // image: markerImage, // 마커 이미지
            clickable: true, //클릭 가능 여부 true
          });
          this.addMarker(marker, result);
        }
      });
    },
    movePosition(address) {
      //주소를 좌표로 변환해 마커 찍기
      // var coord = null;
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
          this.map.setLevel(6);
          // 지도 중심좌표를 접속위치로 변경합니다
          this.map.setCenter(moveLatLon);
        }
      });
    },
    // 마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
    addMarker(marker, result) {
      console.log("addMarker");
      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", () => {
        //마우스를 올려놓으면 해당위치 아파트의 간략한 정보를 보여준다.
        this.displayInfoWindow(result, this.index - 1);
      });

      // 마커에 mouseout 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", () => {
        this.closeOverlay();
        //표시되었던 정보를 없애준다.
      });
      // 마커에 click 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        //해당 위치의 상세정보를 표현한다.
      });
      kakao.maps.event.addListener(marker, "click", () => {
        //해당 위치의 상세정보를 표현한다.
      });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    displayInfoWindow(result, idx) {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        // this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${result[0].y}&lon=${result[0].x}&appid=e0e4e08f4b94cdb719181e535eb81808`;
      axios.get(URL).then(({ data }) => {
        let wData = data;
        let temp = Number(wData.main.temp) - 273;
        var imgURL = `http://openweathermap.org/img/w/${wData.weather[0].icon}.png`;
        console.log(imgURL);
        console.log(wData);
        console.log(wData.main.temp);
        console.log(wData.weather);
        console.log("idx : " + idx);
        console.log(result[idx]);
        //console.log(result[0].y, result[0].x);
        //var iwContent = `<div style="padding:5px;"> ${result[0].y}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        var iwContent =
            // `<div class="info-title">
            // <div style="padding:5px;"> ${this.Dong[idx]}의 날씨 </div>` +
            // `<div style="padding:5px;"> 현재온도 ${Math.ceil(
            //   temp
            // )}도<img src="${imgURL}" width="30" height="30"></div></div>`,
            `<div class="wrap">
                <div class="info">
                    <div class="title">
                        ${this.Dong[idx]}의 날씨
                        <div class="close" @click="closeOverlay" title="닫기"></div>
                    </div>
                    <div class="body">
                        <div class="img">
                            <img src="${imgURL}" width="73" height="70">
                       </div>
                        <div class="desc">
                            <div class="ellipsis">현재온도 ${Math.ceil(
                              temp
                            )}도</div>
                        </div>
                    </div>
                </div>
            </div>`,
          //iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
          iwPosition = new kakao.maps.LatLng(result[0].y, result[0].x),
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        this.infowindow = new kakao.maps.CustomOverlay({
          map: this.map, // 인포윈도우가 표시될 지도
          position: iwPosition,
          content: iwContent,
          removable: iwRemoveable,
        });

        // this.map.setCenter(iwPosition);
      });
    },

    closeOverlay() {
      this.infowindow.setMap(null);
      console.log("close");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#map {
  width: 1000px;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}

.info-title {
  display: block;
  background: #50627f;
  color: #fff;
  text-align: center;
  height: 24px;
  line-height: 22px;
  border-radius: 4px;
  padding: 0px 10px;
}

.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  text-align: center;
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  margin-top: 12%;
  margin-right: 5%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 24px;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
