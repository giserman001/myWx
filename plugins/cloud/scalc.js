export default {
	f_tool_scale_append(iscale_info, iscale_segment) {
		var oinfo;
		var v_scale_0;
		var v_scale_cfg;
		var v_scale_cfg_length;
		var v_scale_info;
		var v_scale_segment;
		oinfo = '';
		if (iscale_info.length == 0) {
			v_scale_cfg = '';
			v_scale_info = '';
		} else {
			v_scale_0 = Number(iscale_info.substr(0, 1));
			v_scale_cfg_length = Number(iscale_info.substr(1, v_scale_0));
			v_scale_cfg = iscale_info.substr(1 + Number(v_scale_0), v_scale_cfg_length);
			v_scale_info = iscale_info.substr(1 + Number(v_scale_0) + Number(v_scale_cfg_length), iscale_info.length);
		}
		v_scale_segment = iscale_segment;
		v_scale_cfg = String(v_scale_cfg) + String(v_scale_segment.length) + ',';
		v_scale_info = String(v_scale_info) + String(v_scale_segment);
		v_scale_cfg_length = v_scale_cfg.length;
		v_scale_0 = String(v_scale_cfg_length).length;
		v_scale_info = String(v_scale_0) + String(v_scale_cfg_length) + String(v_scale_cfg) + String(v_scale_info);
	
		oinfo = String(oinfo) + String(v_scale_info);
		return oinfo;
	},
	f_tool_request_info(list) {
		var v_branchID;
		var v_dataSegment;
		var v_requestInfo;
		v_branchID = '';
		v_dataSegment = '';
		for (var i = 0; i < list.length; i++) {
			if (i == 0) {
				v_branchID = list[i];
				v_dataSegment = '';
			} else {
				v_dataSegment = this.f_tool_scale_append(v_dataSegment, list[i]);
			}
		}
		v_requestInfo = '';
		v_requestInfo = this.f_tool_scale_append(v_requestInfo, v_branchID); //+·ÖÖ§ID
		v_requestInfo = this.f_tool_scale_append(v_requestInfo, v_dataSegment); //+Êý¾Ý¶Î
		return v_requestInfo;
	},
	
	f_tool_scale_list(list) {
		var oinfo;
		var v_oinfo;
		oinfo = '';
		for (var i = 0; i < list.length; i++) {
			oinfo = this.f_tool_scale_append(oinfo, list[i]);
		}
		return oinfo;
	},
	get(iscale_info, iscale_at) {
		var oinfo;
		var v_scale_0;
		var v_scale_cfg;
		var v_scale_cfg_length;
		var v_scale_info;
		var v_sclae_segment;
		var v_counter;
		var v_ix_delimiter_A;
		var v_ix_delimiter_B;
		var v_scale_info_A;
		var v_scale_info_B;
		oinfo = '';
		if (iscale_info.length == 0) {
			oinfo = '';
			return oinfo;
		}
		v_scale_0 = Number(iscale_info.substr(0, 1));
		v_scale_cfg_length = Number(iscale_info.substr(1, v_scale_0));
		v_scale_cfg = iscale_info.substr(1 + Number(v_scale_0), v_scale_cfg_length);
		v_counter = 0;
		v_ix_delimiter_A = 0;
		v_scale_info_A = 0;
		while (true) {
			v_ix_delimiter_B = v_scale_cfg.indexOf(',', v_ix_delimiter_A);
			v_counter = v_counter + 1;
			if (v_counter < iscale_at && v_ix_delimiter_B != 0) {
				v_scale_info_A = v_scale_info_A + Number(v_scale_cfg.substr(v_ix_delimiter_A, v_ix_delimiter_B - v_ix_delimiter_A));
				v_ix_delimiter_A = v_ix_delimiter_B + 1;
			} else {
				break;
			}
		}
		//#,获取scale_info
		if (v_ix_delimiter_B != 0) {
			v_scale_info_A = 1 + v_scale_0 + v_scale_cfg_length + v_scale_info_A;
			v_scale_info_B = Number(v_scale_cfg.substr(v_ix_delimiter_A, v_ix_delimiter_B - v_ix_delimiter_A));
			oinfo = String(iscale_info.substr(v_scale_info_A, v_scale_info_B));
		} else {
			oinfo = '';
		}
		return oinfo;
	}

};
