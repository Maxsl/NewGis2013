package newgis{

	import tcelib.RpcConsts;
	import tcelib.RpcConnection;
	import tcelib.utils.HashMap;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	import tcelib.utils.HashMapEntry;
	
	
	public class StringList_thlp{
		//# -- SEQUENCE --
		
		public var ds:Array = null;
		public function StringList_thlp(ds:Array){
			this.ds = ds
		}		
		
		public function marshall(d:ByteArray):void{
			d.writeInt(this.ds.length);
			for(var n:uint=0; n< this.ds.length;n++){
				var bytes_1:ByteArray = new ByteArray();
				bytes_1.writeUTFBytes(this.ds[n]);
				d.writeInt(bytes_1.length);
				d.writeBytes(bytes_1);
			}			
		}		
		
		public function unmarshall(d:ByteArray):Boolean{
			var r:Boolean = false;
			try{
				var _size:uint = 0;
				_size = d.readUnsignedInt();
				for(var _p:uint=0;_p < _size;_p++){
					{					
						var _o:String = "";
						{						
							var _d:uint = 0;
							_d = d.readUnsignedInt();
							_o = d.readUTFBytes(_d);
						}						
						this.ds.push(_o);
					}					
				}				
			}catch(e:Error){
				return false;
			}			
			return true;
		}		
		
	}	
	

}