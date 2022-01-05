//login, signup 관련
$("#logintest").click(function () {
  //로그인
  var IDarray = localStorage.getItem("user");
  IDarray = JSON.parse(IDarray);
  var pw = $("#loginPW").val();
  var id = $("#loginID").val();
  var flag = false;
  for (var i = 0; i < IDarray.length; i++) {
      if (IDarray[i]['id'] == id && IDarray[i]['pw'] == pw) {
          flag = true;
          break;
      }
  }
  if(flag){
      $("#logIn").modal("hide");
      $("#openLogin").text("logout");
      alert("로그인 완료");
  }else{
      alert("아이디와 비밀번호를 확인해주세요");
  }

});
  $("#signupbtn").click(function () {
  var user = '';
  var id = $("#signUpid").val();
  var pw = $("#signUppw").val();
  var email = $("#signUpemail").val();
  var name = $("#signUpname").val();
  var phone = $("#signUpphone").val();
  //[{'usercount':'"+usercount+"','id':'"+id+"','pw':'"+pw+"','email':'"+email+"','name':'"+name+"','phone':'"+phone+"'}]";
              var obj = new Object;
              obj.usercount = usercount;
              obj.id = id;
              obj.pw = pw;
              obj.email = email;
              obj.phone = phone;
              obj.name = name;
              if (id != '' && pw != '' && email != '' && name != '' && phone != '') {
                  $("#signUp").modal("hide");
                  var user = localStorage.getItem("user");
  
                  if (user == null) user = '';
                  else user = localStorage.getItem("user");
                  user = user.substring(1, user.length - 1);
                  var usercount = localStorage.getItem("usercount");
  
                  if (usercount = NaN) usercount = 1;
                  else usercount = parseInt(usercount) + 1;
  
                  if (user == '') {
                      user += JSON.stringify(obj);
                  } else {
                      user += "," + JSON.stringify(obj);
                  }
                  user = "[" + user + "]";
                  localStorage.setItem("user", user);
                  localStorage.setItem("usercount", usercount);
                  alert("회원가입 되었습니다!");
                  
              } else {
  
                  alert("모든 값을 입력해주세요!");
                  return;
  
              }
          });    
//login, signup 관련 끝

//게시판 관련
// 게시판 구성 ----------------
$(document).ready(function () {
  var board = "[" + localStorage.getItem("boardData") + "]";
  //   console.log(typeof(board));

  var board = JSON.parse(board);
  var title = board.title; // 제목
  var contents = board.contents; // 내용

  if (board) {
    var board_add = "";
    $.each(board, function (index, item) {
      //   console.log(index);
      board_add += `
      <tr>
          <td >${index + 1}</td>
          <td >${item.title}</td> 
          <td >${item.contents}</td>
          <td > <button type="button" style="color:black; background-color:bisque;" class="btn" id="modifyBtn${
            index + 1
          }" data-toggle="modal" data-target="#modifyNotice${index + 1}">수정</button> </td>
          <td > <button type="button" style="color:white; background-color:gray;" class="btn" id="deleteBtn${
            index + 1
          }">삭제</button> </td>
      
      </tr>
`;
    });
    // 게시글 추가----------
    $("#board_list").append(board_add);
  }
});
//게시판 관련 끝



var map, marker, markers = [];
    var area2code_json, code2area_json;
    var subArea_json;//도:key, 시:value인 json
    var parse_data;
    var markers;
    $(document).ready(function () {
      

      // markers=[];//지도에 표시되는 마커를 관리
      // area2code_json => 도+시 :key, 지역코드:value인 json
      // code2area_json => 지역코드 :key, 도,시:value인 json
      [area2code_json, code2area_json] = readTextFile();
      subArea_json = getSubArea();//도:key, 시:value인 json
      // area_position = getPosition(subArea_json);
      console.log(area2code_json);
      console.log(subArea_json);
      // 초기 kakao map 설정 start
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      // var lat = 37.5012743;
      // var lng = 127.039585;
      var locPosition = new kakao.maps.LatLng(37.5012743, 127.039585); // (멀티캠퍼스)
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: locPosition, //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      //현재위치로 map update
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          var message = '<div style="padding:5px;">현재위치인가요?!</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        var message = "geolocation을 사용할수 없어요..";

        displayMarker(locPosition, message);
      }
      // 초기 kakao map 설정 end

      $(".dropdown-item.area").click(function () {
        var selArea = $(this).text();
        $("#areaBtn").text(selArea);
        $("#sub_areaBtn").text("지점선택");
        var sub_areas = subArea_json[selArea];
        $("#office_div").empty();
        $.each(sub_areas, function (i, sub_area) {
          $("#office_div").append(
            '<label class="dropdown-item sub_area">' + sub_area + "</label>"
          );
        });
      });
      //officePosition의 lat, lng를 이용한 marker
      $(document).on("click", ".dropdown-item.sub_area", function () {
        var selSubArea = $(this).text();
        $("#sub_areaBtn").text(selSubArea);
      });
//게시판 관련
      //메인페이지의 공지사항 글쓰기모달에서 작성완료 버튼 눌렀을 때 발생하는 내용
      $("#writen_btn").click(function () {
        var title = $("#title").val();
        if (!title) {
          alert("제목을 입력하세요");
          return;
        }

        var contents = $("#contents").val();
        if (!contents) {
          alert("내용을 입력하세요");
          return;
        }
        //입력 data를 이용해서 JSON객체로 생성
        var boardData = {
          title: title,
          contents: contents,
        };

        var temp = localStorage.getItem("boardData");
        if (temp == null) temp = "";
        else temp += ",";

        var board_json = temp + JSON.stringify(boardData); // JSON객체를 문자열 변환
        alert(board_json);

        localStorage.setItem("boardData", board_json); // localStorage에 넣기

        board_json = "[" + board_json + "]";
        board_json = JSON.parse(board_json);
        if (board_json) {
          var board_add = "";
          $.each(board_json, function (index, item) {
            //   console.log(index);
            board_add += `
            <tr>
                <td >${index + 1}</td>
                <td >${item.title}</td> 
                <td >${item.contents}</td>
                <td > <button type="button" style="color:black; background-color:bisque;" class="btn" id="modifyBtn${
                  index + 1
                }" data-toggle="modal" data-target="#modifyNotice${index + 1}">수정</button> </td>
                <td > <button type="button" style="color:white; background-color:gray;" class="btn" id="deleteBtn${
                  index + 1
                }">삭제</button> </td>
            
            </tr>
      `;
          });
          // 게시글 추가----------
          $("#board_list").html(board_add);
        }
        alert("게시글을 생성합니다");
        //location.href="index.html";      //게시판으로 이동

      });
      //공지사항 수정하기  눌렀을 때 작동 XXXXXXX(일단 글쓰기 로직과 같게끔 구현해뒀음)
      $("#modified_btn").click(function () {
        title = $("#title_mf").val();
        if (!title) {
          alert("제목을 입력하세요");
          return;
        }

        contents = $("#contents_mf").val();
        if (!contents) {
          alert("내용을 입력하세요");
          return;
        }
        //입력 data를 이용해서 JSON객체로 생성
        boardData = {
          title: title,
          contents: contents,
        };

        temp = localStorage.getItem("boardData");
        if (temp == null) temp = "";
        else temp += ",";

        board_json = temp + JSON.stringify(boardData); // JSON객체를 문자열 변환
        alert(board_json);

        localStorage.setItem("boardData", board_json); // localStorage에 넣기

        alert("게시글을 수정합니다");
      });
//게시판 관련 끝
    });//ready끝*********************************************************************************

    var selected_area;
    function movePosition(address) {
      //주소를 좌표로 변환해 마커 찍기
      var coord = null;
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
          var message = `<div style="padding:5px;">${address}</div>`;
          // 지도 중심을 부드럽게 이동시킵니다
          // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
          map.panTo(moveLatLon);
          map.setLevel(6);
          // displayMarker(moveLatLon, message);
        }
      });
    }

    function readTextFile() {//
      area2code = [];
      code2area = [];
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", "APT_AreaCode.txt", false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            var row = allText.split("\n");

            for (var i = 0; i < row.length; i++) {
              var sp = row[i].split(" ");
              var key = sp[1] + " " + sp[2].replace(/\t\r/g, "");
              var value = sp[0];
              area2code[key] = value;
              code2area[value] = key;
            }
          }
        }
      }
      rawFile.send(null);
      return [area2code, code2area];
    }

    function getSubArea() {
      subArea = [];//도:key, 시:value인 json
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", "APT_AreaCode.txt", false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            var row = allText.split("\n");
            var temp = row[0].split(" ")[1];
            var val_arr = [];
            for (var i = 0; i < row.length; i++) {
              var sp = row[i].split(" ");
              var key = sp[1];
              var value = sp[2].replace(/\t\r/g, "");
              if (temp === key) {
                val_arr.push(value);
              } else {
                subArea[temp] = val_arr;
                temp = key;
                val_arr = [];
                val_arr.push(value);
              }
            }
            subArea[temp] = val_arr;
          }
        }
      }
      rawFile.send(null);
      return subArea;
    }



    //아파트 데이터 가져오기
    function getAPTData() {
      var xhr = new XMLHttpRequest();
      var url = 'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev'; /*URL*/
      var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + '0%2FZcg64275L8%2F21s%2FEullZgNkVGtCndA5GMB3TgMWspmqjk3VrG2mTIcc5aMyj82y%2BVBXAnUgb1fFzPjUsUp7A%3D%3D'; /*Service Key*/
      var selArea = $("#areaBtn").text(); //선택한 시
      var selSubArea = $("#sub_areaBtn").text();//선택한 도
      var address_code = area2code_json[selArea + " " + selSubArea];//선택한 지역코드
      var full_address = new Array();//아파트 주소 배열,위도경도를 위한 
      var searched_apt_list = new Array();


      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /**/
      queryParams += '&' + encodeURIComponent('LAWD_CD') + '=' + encodeURIComponent(address_code + ''); /**/
      queryParams += '&' + encodeURIComponent('DEAL_YMD') + '=' + encodeURIComponent('202001'); /**/
      xhr.open('GET', url + queryParams);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          // console.log('Status: ' + this.status +", "+ 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) +", "+ 'nBody: ' + this.responseText)
          console.log(typeof (this.responseText));
          var json = $.xml2json(this.responseText);

          // JSON.parse(JSON.parse(JSON.parse(JSON.parse(json).body).items))
          parse_data = json.body.items.item;//배열

          console.log(parse_data);
          for (var i = 0; i < parse_data.length; i++) {//배열에서 하나씩 꺼내서 주소만들기, 경도 위도를 위한
            var building_code = Number.parseInt(parse_data[i]["도로명건물본번호코드"]);
            var building_sub_code = Number.parseInt(parse_data[i]["도로명건물부번호코드"]) + "";
            if (building_sub_code != 0) {
              building_code += "-" + building_sub_code;
            }

            searched_apt_list.push(parse_data[i]["법정동"] + " " + parse_data[i]["아파트"]);
            full_address.push(parse_data[i]["법정동"] + " " + parse_data[i]["도로명"] + " " + building_code);
          }
          movePosition(full_address[0]);//선택한 지역으로 지도 이동

          //조회된 위치에 마커 표시
          for (var i = 0; i < full_address.length; i++) {
            setMark(full_address[i]);
          }
          displayPlaces(parse_data);
        }
      };
      xhr.send('');
    }

    function setMark(address) {
      markers = new Array();
      //주소를 좌표로 변환해 마커 찍기
      var geocoder = new kakao.maps.services.Geocoder();
      var imageSrc = "img/my_position.png";
      // 마커 이미지의 이미지 크기
      var imageSize = new kakao.maps.Size(30, 30);
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          //coords->position list에 넣어주기(content = 인포윈도우에 들어갈 내용)
          //positions.push({"position": coords});

          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: coords, // 마커를 표시할 위치
            //content: positions[i].content, // 마커의 content, 마커에 마우스를 올리면 content가 표시됩니다
            image: markerImage, // 마커 이미지 
            clickable: true //클릭 가능 여부 true
          });
          addMarker(marker);
        }
      });
    }

    // 마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
    function addMarker(marker) {
      console.log("addMarker");
      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        //마우스를 올려놓으면 해당위치 아파트의 간략한 정보를 보여준다.
        console.log(123);
      });
      // }
      // 마커에 mouseout 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        //표시되었던 정보를 없애준다.
      });

      // 마커에 click 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        //해당 위치의 상세정보를 표현한다.

      });

      
    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {

      var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';
      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        fragment.appendChild(itemEl);

        (function(marker, data) {
          kakao.maps.event.addListener(marker, 'click', function() {
            // console.log(title);
          });

          itemEl.onclick = function () {
            console.log(data);
            //테이블에 리스트 보이기
            var building_code = Number.parseInt(data["도로명건물본번호코드"]);
            var building_sub_code = Number.parseInt(data["도로명건물부번호코드"]) + "";
            if (building_sub_code != 0) {
              building_code += "-" + building_sub_code;
            }

            data["법정동"] + " " + data["도로명"] + " " + building_code
            let txt = "<tr><th>리스트</th><th></th></tr>";
            
            txt += "<tr><td style = 'border: 1px solid #444444;'>" + "주소 : " + data["법정동"] + " " + data["도로명"] + " " + building_code + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "아파트 : " + data["아파트"] + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "층 : " + data["층"] + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "건축년도 : " + data["건축년도"] + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "거래금액 : " + data["거래금액"] + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "전용면적 : " + data["전용면적"] + "</td></tr>" +
              "<tr><td style = 'border: 1px solid #444444;'>" + "거래일 : " + data["년"] + "." + data["월"] + "." + data["일"] + "." + "</td></tr>";
            
            document.getElementById('APT_table').innerHTML = txt;
          };
        })(marker, places[i]);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      
      menuEl.scrollTop = 0;
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

      var el = document.createElement('li'),
        itemStr = '<div class="info">' +
          '   <h5>' + places["아파트"] + '</h5>' +
          '   <span>' + places["법정동"] + " " + places["도로명"] + '</span>' +
          '   <span class="jibun gray">' + places["법정동"] + " " + places["도로명"] + '</span>' +
          '</div>';
          
      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {   
      while (el.hasChildNodes()) {
          el.removeChild (el.lastChild);
      }
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
    }
    
    function displayMarker(locPosition, message) {
      if (marker) marker.setMap(null); // 기존 maker 제거

      var imageSrc = "img/my_position.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(50, 70), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

