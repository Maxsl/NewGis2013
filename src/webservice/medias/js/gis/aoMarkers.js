

/*
 javascript ����:
 ���function()��Ϊһ��class��������this.�����˳�Ա����
 Ҳ�����˳�Ա����this.func(),�����������ⲿ�������classʵ����func()��������
 ����������ڿ���ͨ��this.�����������ĳ�Ա������
 ����������ˣ���������class.func()��Ϊһ������������������Ϊ�ص����¼���������
 ��������������������this��ָ�ĵ����߶��󣬶�������ԭ�ȵ�class�����ž�����ν��
 javascript�ıհ����ơ�

var animal = new Animal();
function Animal(){
	this.name='abc';
	this.move = function(xy){}  //�����move����������Ǳհ����ݵ�Dog��ȥ�ˣ���this��ָ��Dog�ˣ����Բ��ܷ���Animal�ı�����
	this.create = function(){
		dog = new Dog(name,this.move); //����this.move�Ǹ�����,Dog�ĵڶ��������Ǹ�
							function,���function������ȫ�ֵĻ���ָ��ĳ������ĺ�����
		dog = new  Dog(name,animal.move);//��������ȷ�ģ�Ҳ���Ǳհ��ˣ�Dog�ཫ�������functi��Dog�ڲ�
										���Ահ��������ڴ�
	}
}
 
*/
var g_aoMarkerMgr = null; //��ǹ��� 

 
function aoMarkerMgr(map){
	this.map = map;
	this.aos = new Array();
	this.popupDetail = null;
	this.markers = new OpenLayers.Layer.Markers( "aoMarkers" );
	map.addLayer(this.markers);
	
  var size = new OpenLayers.Size(24,24);
  var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
  this.icon_ao= new OpenLayers.Icon('/medias/images/4-katoo-car-02.png',size,offset);
	this.icon_aofocus= new OpenLayers.Icon('/medies/images/4-katoo-car-02.png',size,offset);
	
	/*popup������ʾao����ϸ��*/
	
	
	this.onClosePopup = function(){
		if(g_aoMarkerMgr.popupDetail){
			try{
				//g_aoMarkerMgr.popupDetail.toggle();
				g_aoMarkerMgr.map.removePopup(g_aoMarkerMgr.popupDetail);
				g_aoMarkerMgr.popupDetail.destroy();
			}catch(e){
				alert(e.toString());
			}
			g_aoMarkerMgr.popupDetail = null;
			//alert(g_aoMarkerMgr.popupDetail);
		}
	};
	this.onMouseLeft = function(e){
		g_aoMarkerMgr.onClosePopup(e);
		//OpenLayers.Event.stop(e);
	};
	
	this.onMouseMove = function(e){
		//alert(g_aoMarkerMgr.popupDetail);
		if(g_aoMarkerMgr.popupDetail){
			return ;
		}
		var html ="<div style='background-color:red; width:150;height:100'>aoid</div>";
		//alert(e.object.ao.aoid);
		//alert( gDataMgr.getAoProfile(e.object.ao.aoid));
		html = e.object.ao.name + "<br>";
		html += gDataMgr.getAoProfile(e.object.ao.aoid);
		g_aoMarkerMgr.popupDetail = new OpenLayers.Popup("aopop",
                   e.object.lonlat.clone(),
									 //new OpenLayers.LonLat(5,40),
                   new OpenLayers.Size(260,160),
                   html);//,
                   //true,g_aoMarkerMgr.onClosePopup);
		//alert(g_aoMarkerMgr.popupDetail);
		
		//g_aoMarkerMgr.popupDetail.closeOnMove = true;
		g_aoMarkerMgr.popupDetail.setBackgroundColor("blue");
		g_aoMarkerMgr.popupDetail.setOpacity(0.7);
		e.object.map.addPopup(g_aoMarkerMgr.popupDetail);
		//OpenLayers.Event.stop(e);
	};
	this.createActiveObject = function(aoid,name){
		try{
			var marker = new OpenLayers.Marker(new OpenLayers.LonLat(0,0),this.icon_ao);		
			marker.ao = {'aoid':aoid,'name':name};
			this.aos.push(marker);
			marker.events.register('mouseover',marker,this.onMouseMove);
			marker.events.register('mouseout',marker,this.onMouseLeft);
		}catch(e){
			//alert(e.toString());
		}
	};
	
	/* 2010.12.14 IE6�� ע��ʹ��//�����²��ɿص��쳣
	//�ƶ�ao����
	
	BROWSER_EVENTS: [
        "mouseover", "mouseout",
        "mousedown", "mouseup", "mousemove", 
        "click", "dblclick", "rightclick", "dblrightclick",
        "resize", "focus", "blur"
    ],
    
		*/	
	this.aoMoveTo = function(aoid,lon,lat){
	
		try{
			for(var n=0;n<this.markers.markers.length;n++){
				var mkr = this.markers.markers[n];
				if(mkr.ao.aoid == aoid){					
					mkr.lonlat = new OpenLayers.LonLat(lon,lat);					
					this.markers.drawMarker(mkr);
					break;
				}
			}
		}catch(e){
			alert(e.toString());
		}
														
	};
		 
		 
	this.clear = function(){
		this.markers.clearMarkers();
		this.aos = new Array()
	};
	
	this.hide = function(){
		for(var n=0;n<this.markers.markers.length;n++){
			this.aos.push(this.markers.markers[n]);
		}
		this.markers.clearMarkers();
		
	};
	
	this.show = function(){
		for (var n=0;n<this.aos.length;n++){
			this.markers.addMarker(this.aos[n]);
		}
		this.aos = new Array();		
	};
												
}

function init_MapMarkers(map){
	try{		
		g_aoMarkerMgr = new aoMarkerMgr(map);
	}catch(e){
		alert(e);
	}
	
}

