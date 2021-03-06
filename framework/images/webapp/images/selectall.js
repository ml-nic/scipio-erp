/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Define global variable to store last auto-completer request object (jqXHR).
var LAST_AUTOCOMP_REF = null;

//default ajax request timeout in milliseconds
var AJAX_REQUEST_TIMEOUT = 5000;

// Check Box Select/Toggle Functions for Select/Toggle All

function toggle(e) {
    e.checked = !e.checked;
}

function checkToggleDefault(e) {
    checkToggle(e, "selectAllForm");
}
// Scipio: Extended with prefix and exact name options (optional)
function checkToggle(e, formName, name, namePrefix) {
    if (!name && !namePrefix) {
        namePrefix = "_rowSubmit";
    }
    var cform = document[formName];
    if (e.checked) {
        var len = cform.elements.length;
        var allchecked = true;
        for (var i = 0; i < len; i++) {
            var element = cform.elements[i];
            if (namePrefix) {
                if (element.name.substring(0, namePrefix.length) == namePrefix && !element.checked) {
                    allchecked = false;
                }
            } else if (name) {
                if (element.name == name && !element.checked) {
                    allchecked = false;
                }
            }
            cform.selectAll.checked = allchecked;
        }
    } else {
        cform.selectAll.checked = false;
    }
}

function toggleAllDefault(e) {
    toggleAll(e, "selectAllForm");
}
// Scipio: Extended with prefix and exact name options (optional)
function toggleAll(e, formName, name, namePrefix) {
    if (!name && !namePrefix) {
        namePrefix = "_rowSubmit";
    }
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if (namePrefix) {
            if (element.name.substring(0, namePrefix.length) == namePrefix && element.checked != e.checked) {
                toggle(element);
            }
        } else if (name) {
            if (element.name == name && element.checked != e.checked) {
                toggle(element);
            }
        }
    }
}

function selectAllDefault() {
    selectAll("selectAllForm");
}
function selectAll(formName) {
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if ((element.name == "selectAll" || element.name.substring(0, 10) == "_rowSubmit") && !element.checked) {
            toggle(element);
        }
    }
}

function removeSelectedDefault() {
    removeSelected("selectAllForm");
}
function removeSelected(formName) {
    var cform = document[formName];
    cform.removeSelected.value = true;
    cform.submit();
}

// highlight the selected row(s)
// FIXME: this should support presence of extra class names

function highlightRow(e,rowId){
    var currentClassName = document.getElementById(rowId).className;
    if (e.checked) {
        if (currentClassName == '') {
            document.getElementById(rowId).className = scipioStyles.row_selected;
        } else if (currentClassName == scipioStyles.row_reg) {
            document.getElementById(rowId).className = scipioStyles.row_reg + ' ' + scipioStyles.row_selected;
        } else if (currentClassName == scipioStyles.row_alt) {
            document.getElementById(rowId).className = scipioStyles.row_alt + ' ' + scipioStyles.row_selected;
        }
    } else {
        if (currentClassName == scipioStyles.row_selected) {
            document.getElementById(rowId).className = '';
        } else if (currentClassName == (scipioStyles.row_reg + ' ' + scipioStyles.row_selected)) {
            document.getElementById(rowId).className = scipioStyles.row_reg;
        } else if (currentClassName == (scipioStyles.row_alt + ' ' + scipioStyles.row_selected)) {
            document.getElementById(rowId).className = scipioStyles.row_alt;
        }
    }
}

function highlightAllRows(e, halfRowId, formName){
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if (element.name.substring(0, 10) == "_rowSubmit") {
            highlightRow(e, halfRowId+element.name.substring(13));
        }
    }
}

// popup windows functions

function popUp(url, name, height, width) {
    popupWindow = window.open(url, name, 'location=no,scrollbars,width=' + width + ',height=' + height);
}
function popUpSmall(url, name) {
    popUp(url, name, '300', '450');
}
function popUpPrint(printserver, screen1) {
    popUpPrint(printserver, screen1, null, null);
}
function popUpPrint(printserver, screen1, screen2) {
    popUpPrint(printserver, screen1, screen2, null);
}
function popUpPrint(printserver, screen1, screen2, screen3) {
    if  (printserver == null) {
        printserver = "http://localhost:10080/"; // default print server port
    }

    if (screen1 != null) {
        screen1 = screen1.replace(/\:/g, "%3A");
        screen1 = screen1.replace(/\//g, "%2F");
        screen1 = screen1.replace(/\#/g, "%23");
        screen1 = screen1.replace(/\?/g, "%3F");
        screen1 = screen1.replace(/\=/g, "%3D");
        url = printserver + screen1;
        window.open(url, "screen1", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
        self.focus();

        if (screen2 != null) {
            screen2 = screen2.replace(/\:/g, "%3A");
            screen2 = screen2.replace(/\//g, "%2F");
            screen2 = screen2.replace(/\#/g, "%23");
            screen2 = screen2.replace(/\?/g, "%3F");
            screen2 = screen2.replace(/\=/g, "%3D");
            url = printserver + screen2;
            window.open(url, "screen2", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
            self.focus();

            if (screen3 != null) {
                screen3 = screen3.replace(/\:/g, "%3A");
                screen3 = screen3.replace(/\//g, "%2F");
                screen3 = screen3.replace(/\#/g, "%23");
                screen3 = screen3.replace(/\?/g, "%3F");
                screen3 = screen3.replace(/\=/g, "%3D");
                url = printserver + screen3;
                window.open(url, "screen13", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
                self.focus();
            }
        }
    }
}

// Post a form from a pop up using the parent window
function doPostViaParent(formName) {
    var theForm = document[formName];
    var newForm = theForm.cloneNode(true);
    var hiddenDiv = document.createElement('div');
    hiddenDiv.style.visibility = 'hidden';
    hiddenDiv.appendChild(newForm);
    window.opener.document.body.appendChild(hiddenDiv);
    newForm.submit();
    window.opener.focus();
}
// From a child window, navigate the parent window to the supplied url
function doGetViaParent(url) {
    window.opener.location = url;
    window.opener.focus();
}

// hidden div functions

function getStyleObject(objectId) {
    if (document.getElementById && document.getElementById(objectId)) {
        return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        return document.layers[objectId];
    } else {
        return false;
    }
}
function changeObjectVisibility(objectId, newVisibility) {
    var styleObject = getStyleObject(objectId);
    if (styleObject) {
        styleObject.visibility = newVisibility;
        return true;
    } else {
        return false;
    }
}

// To use this in a link use a URL like this: javascript:confirmActionLink('You want to delete this party?', 'deleteParty?partyId=${partyId}')
function confirmActionLink(msg, newLocation) {
    if (msg == null) {
        msg = "Are you sure you want to do this?";
    }
    var agree = confirm(msg);
    if (agree) {
        if (newLocation != null) location.replace(newLocation);
    }
}

// To use this in a link use a URL like this: javascript:confirmActionFormLink('You want to update this party?', 'updateParty')
function confirmActionFormLink(msg, formName) {
    if (msg == null) {
        msg = "Are you sure you want to do this?";
    }
    var agree = confirm(msg);
    if (agree) {
        if (formName != null) document.forms[formName].submit();
    }
}

// ===== Ajax Functions - based on jQuery.js ===== //

/** Update an area (HTML container element).
  * @param areaId The id of the HTML container to update
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
*/

function ajaxUpdateArea(areaId, target, targetParams) {
    if (areaId == "window") {
        targetUrl = target + "?" + targetParams.replace('?','');
        window.location.assign(targetUrl);
        return;
    }
    waitSpinnerShow();
    jQuery.ajax({
        url: target,
        type: "POST",
        data: targetParams,
        success: function(data) {
            jQuery("#" + areaId).html(data);
            waitSpinnerHide();
        },
        error: function(data) {waitSpinnerHide()}
    });
}

/** Update multiple areas (HTML container elements).
  * @param areaCsvString The area CSV string. The CSV string is a flat array in the
  * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxUpdateAreas(areaCsvString) {
    /*split all parameters separate by comma, the regExp manage areaId,target,param1=a&param2={b,c,d}&param3=e as three parameters*/
    var regExpArea = /,(?=(?:[^{}]*{[^{}]*})*[^{}]*$)/g;
    var areaArray = areaCsvString.split(regExpArea);
    var numAreas = parseInt(areaArray.length / 3);
    for (var i = 0; i < numAreas * 3; i = i + 3) {
        var areaId = areaArray[i];
        var target = areaArray[i + 1];
        var targetParams = areaArray[i + 2];
        // Remove the ? and the anchor flag from the parameters
        // not nice but works
        targetParams = targetParams.replace('#','');
        targetParams = targetParams.replace('?','');
        ajaxUpdateArea(areaId, target, targetParams);
    }
}

/** Update an area (HTML container element) periodically.
  * @param areaId The id of the HTML container to update
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
  * @param interval The update interval, in seconds.
*/
function ajaxUpdateAreaPeriodic(areaId, target, targetParams, interval) {
    var intervalMillis = interval * 1000;
    jQuery.fjTimer({
        interval: intervalMillis,
        repeat: true,
        tick: function(container, timerId){
            jQuery.ajax({
                url: target,
                type: "POST",
                data: targetParams,
                success: function(data) {
                    jQuery("#" + areaId).html(data);
                    waitSpinnerHide();
                },
                error: function(data) {waitSpinnerHide()}
            });

        }
    });
}

/** Submit request, update multiple areas (HTML container elements).
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
  * @param areaCsvString The area CSV string. The CSV string is a flat array in the
  * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxSubmitRequestUpdateAreas(target, targetParams, areaCsvString) {
    updateFunction = function(transport) {
        ajaxUpdateAreas(areaCsvString);
    }
    jQuery.ajax({
        url: target,
        type: "POST",
        data: targetParams,
        success: updateFunction()
    });
}

/** Submit form, update an area (HTML container element).
  * @param form The form element
  * @param areaId The id of the HTML container to update
  * @param submitUrl The URL to call to update the HTML container
*/
function submitFormInBackground(form, areaId, submitUrl) {
    submitFormDisableSubmits(form);
    updateFunction = function() {
        jQuery("#" + areaId).load(submitUrl);
    }
    jQuery.ajax({
        url: jQuery(form).attr("action"),
        data: jQuery(form).serialize(),
        success: updateFunction()
    });
}

/** Submit form, update multiple areas (HTML container elements).
 * @param form The form element
 * @param areaCsvString The area CSV string. The CSV string is a flat array in the
 * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxSubmitFormUpdateAreas(form, areaCsvString) {
   waitSpinnerShow();
   var msgContainerId = 'content-messages';
   var msgContainerIdSel = '#'+msgContainerId;
   var msgTemplateId = 'content-messages-error-template';
   var msgContentClass = 'content-message-content';
   //var errorMsgClass = 'errorMessage'; // SCIPIO: no longer needed
   // SCIPIO: dont want this behavior hardcoded
   //hideErrorContainer = function() {
   //    jQuery('#content-messages').html('');
   //    jQuery('#content-messages').removeClass('errorMessage').fadeIn('fast');
   //}
   updateFunction = function(data) {
       if (data._ERROR_MESSAGE_LIST_ != undefined || data._ERROR_MESSAGE_ != undefined) {
           if (!jQuery(msgContainerIdSel).length) {
               // SCIPIO: NOTE: the FTLs/themes should usually have an empty content-messages div present so this part never runs,
               // but this is still needed as emergency. however, changed the default fallback here to place as child of main-content.
               ////add this div just after app-navigation
               //if(jQuery('#content-main-section')){
               //    jQuery('#content-main-section' ).before('<div id="content-messages" onclick="hideErrorContainer()"></div>');
               //}
               var parentContentId = 'main-content';
               if(jQuery('#'+parentContentId)){
                   jQuery('#'+parentContentId).prepend('<div id="'+msgContainerId+'"></div>'); // SCIPIO: not like this: onclick="hideErrorContainer()
               }
           }
           //jQuery(msgContainerIdSel).addClass(errorMsgClass);
           // SCIPIO: we use templates
           //if (data._ERROR_MESSAGE_LIST_ != undefined && data._ERROR_MESSAGE_ != undefined) {
           //    jQuery(msgContainerIdSel).html(data._ERROR_MESSAGE_LIST_ + " " + data._ERROR_MESSAGE_);
           //} else if (data._ERROR_MESSAGE_LIST_ != undefined) {
           //    jQuery(msgContainerIdSel).html(data._ERROR_MESSAGE_LIST_);
           //} else {
           //    jQuery(msgContainerIdSel).html(data._ERROR_MESSAGE_);
           //}
           var errorMsgContent;
           if (data._ERROR_MESSAGE_LIST_ != undefined && data._ERROR_MESSAGE_ != undefined) {
               errorMsgContent = data._ERROR_MESSAGE_LIST_ + " " + data._ERROR_MESSAGE_;
           } else if (data._ERROR_MESSAGE_LIST_ != undefined) {
               errorMsgContent = data._ERROR_MESSAGE_LIST_;
           } else {
               errorMsgContent = data._ERROR_MESSAGE_;
           }
           if (!errorMsgContent) {
               errorMsgContent = "";
           }
           var msgTemplateParent = jQuery('#'+msgTemplateId);
           var msgTemplateContent;
           // we write to the content-messages container UNLESS there's a main-alert sub-box there already
           var targetMsgContainer = jQuery(msgContainerIdSel);
           // can only use templates if present and has a child element with the msgContentClass class
           if (msgTemplateParent.length && jQuery('.'+msgContentClass, msgTemplateParent).length) {
               msgTemplateContent = jQuery(msgTemplateParent.html()); // clone() for safety, shouldn't change anything
               var extraDivId = msgTemplateParent.attr('content-messages-type-wrapper-id'); // custom html attribute
               if (extraDivId) {
                   var extraDiv = jQuery('#'+extraDivId);
                   if (extraDiv.length) {
                       targetMsgContainer = extraDiv;
                   } else {
                       msgTemplateContent = jQuery('<div id="'+extraDivId+'"></div>').html(msgTemplateContent);
                   }
               }
               jQuery('.'+msgContentClass, msgTemplateContent).html(errorMsgContent);
           } else {
               // no templates, use this fallback WARN: has no extra div!
               msgTemplateContent = jQuery('<div class="'+msgContentClass+'"></div>');
               msgTemplateContent.html(errorMsgContent);
           }
           targetMsgContainer.html(msgTemplateContent);
           jQuery(msgContainerIdSel).fadeIn('fast');
       } else {
           if (jQuery(msgContainerIdSel).length) {
               jQuery(msgContainerIdSel).html('');
               //jQuery(msgContainerIdSel).removeClass(errorMsgClass);
               jQuery(msgContainerIdSel).fadeIn("fast");
           }
           ajaxUpdateAreas(areaCsvString);
       }
       waitSpinnerHide();
   }

   jQuery.ajax({
       type: "POST",
       url: jQuery("#" + form).attr("action"),
       data: jQuery("#" + form).serialize(),
       success: function(data) {
               updateFunction(data);
       }
   });
}

/** Enable auto-completion for text elements, with a possible span of tooltip class showing description.
 * @param areaCsvString The area CSV string. The CSV string is a flat array in the
 * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/

function ajaxAutoCompleter(areaCsvString, showDescription, defaultMinLength, defaultDelay, formName) {
    ajaxAutoCompleter(areaCsvString, showDescription, defaultMinLength, defaultDelay, formName, null);
}
function ajaxAutoCompleter(areaCsvString, showDescription, defaultMinLength, defaultDelay, formName, args) {
    var areaArray = areaCsvString.replace(/&amp;/g, '&').split(",");
    var numAreas = parseInt(areaArray.length / 3);

    for (var i = 0; i < numAreas * 3; i = i + 3) {
        var initUrl = areaArray[i + 1];
        if (initUrl.indexOf("?") > -1)
            var url = initUrl + "&" + areaArray[i + 2];
        else
            var url = initUrl + "?" + areaArray[i + 2];
        var div = areaArray[i];
        // create a separated div where the result JSON Opbject will be placed
        if ((jQuery("#" + div + "_auto")).length < 1) {
            jQuery("<div id='" + div + "_auto'></div>").insertBefore("#" + areaArray[i]);
        }

        jQuery("#" + div).autocomplete({
            minLength: defaultMinLength,
            delay: defaultDelay,
            source: function(request, response){
                var queryArgs = {"term": request.term};
                if (typeof args == "object" && jQuery.isArray(args)) {
                     for (var i = 0; i < args.length; i++) {
                         queryArgs["parm" + i] = jQuery(args[i]).val();
                     }
                }
                jQuery.ajax({
                    url: url,
                    type: "post",
                    data: queryArgs,
                    beforeSend: function (jqXHR, settings) {
                        //If LAST_AUTOCOMP_REF is not null means an existing ajax auto-completer request is in progress, so need to abort them to prevent inconsistent behavior of autocompleter
                        if (LAST_AUTOCOMP_REF != null && LAST_AUTOCOMP_REF.readyState != 4) {
                            var oldRef = LAST_AUTOCOMP_REF;
                            oldRef.abort();
                            //Here we are aborting the LAST_AUTOCOMP_REF so need to call the response method so that auto-completer pending request count handle in proper way
                            response( [] );
                        }
                        LAST_AUTOCOMP_REF= jqXHR;
                    },
                    success: function(data) {
                        // reset the autocomp field
                        autocomp = undefined;

                        jQuery("#" + div + "_auto").html(data);

                        if (typeof autocomp != 'undefined') {
                            jQuery.each(autocomp, function(index, item){
                                item.label = jQuery("<div>").html(item.label).text();
                            })
                            // autocomp is the JSON Object which will be used for the autocomplete box
                            response(autocomp);
                        }
                    },
                    error: function(xhr, reason, exception) {
                        if(exception != 'abort') {
                            alert("An error occurred while communicating with the server:\n\n\nreason=" + reason + "\n\nexception=" + exception);
                        }
                    }
                });
            },
            select: function(event, ui){
                //jQuery("#" + areaArray[0]).html(ui.item);
                jQuery("#" + areaArray[0]).val(ui.item.value); // setting a text field
                if (showDescription && (ui.item.value != undefined && ui.item.value != '')) {
                    setLookDescription(areaArray[0], ui.item.label, areaArray[2], formName, showDescription)
                }
            }
        });
        if (showDescription) {
            var lookupDescriptionLoader = new lookupDescriptionLoaded(areaArray[i], areaArray[i + 1], areaArray[i + 2], formName);
            lookupDescriptionLoader.update();
            jQuery("#" + areaArray[i]).bind('change lookup:changed', function(){
                lookupDescriptionLoader.update();
            });
        }
    }
}

function setLookDescription(textFieldId, description, params, formName, showDescription){
    if (description) {
        var start = description.lastIndexOf(' [');
        if (start != -1) {
            description = description.substring(0, start);

            // This sets a (possibly hidden) dependent field if a description-field-name is provided
            var dependentField = params.substring(params.indexOf("searchValueFieldName"));
            dependentField = jQuery("#" + formName + "_" + dependentField.substring(dependentField.indexOf("=") + 1));
            var dependentFieldValue = description.substring(0, description.lastIndexOf(' '))
            if (dependentField.length) {
                dependentField.val(dependentFieldValue);
                dependentField.trigger("change"); // let the 'hidden' field know its been changed
            }
        }
        var lookupWrapperEl = jQuery("#" + textFieldId).closest('.field-lookup');
        if (lookupWrapperEl.length) {
            if (start == -1 && showDescription) {
                var start = description.indexOf(' ');
                if (start != -1 && description.indexOf('<script type="text/javascript">') == -1) {
                    description = description.substring(start);
                }
            }
            tooltipElement = jQuery("#" + textFieldId + '_lookupDescription')
            if (!tooltipElement.length) {
                tooltipElement = jQuery("<span id='" + textFieldId + "_lookupDescription' class='tooltip'></span>");
            }
            tooltipElement.html(description);
            lookupWrapperEl.append(tooltipElement);
        }
    }
}

/** Enable auto-completion for drop-down elements.*/

function ajaxAutoCompleteDropDown() {
    jQuery.widget( "ui.combobox", {
        _create: function() {
            var self = this;
            var select = this.element.hide(),
                selected = select.children( ":selected" ),
                value = selected.val() ? selected.text() : "";
            var input = jQuery( "<input>" )
                .insertAfter( select )
                .val( value )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function( request, response ) {
                        var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex(request.term), "i" );
                        response( select.children( "option" ).map(function() {
                            var text = jQuery( this ).text();
                            if ( this.value && ( !request.term || matcher.test(text) ) )
                                return {
                                    label: text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                            jQuery.ui.autocomplete.escapeRegex(request.term) +
                                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<b>$1</b>" ),
                                    value: text,
                                    option: this
                                };
                        }) );
                    },
                    select: function( event, ui ) {
                        ui.item.option.selected = true;
                        //select.val( ui.item.option.value );
                        self._trigger( "selected", event, {
                            item: ui.item.option
                        });
                    },
                    change: function( event, ui ) {
                        if ( !ui.item ) {
                            var matcher = new RegExp( "^" + jQuery.ui.autocomplete.escapeRegex( jQuery(this).val() ) + "$", "i" ),
                                valid = false;
                            select.children( "option" ).each(function() {
                                if ( this.value.match( matcher ) ) {
                                    this.selected = valid = true;
                                    return false;
                                }
                            });
                            if ( !valid ) {
                                // remove invalid value, as it didn't match anything
                                jQuery( this ).val( "" );
                                select.val( "" );
                                return false;
                            }
                        }
                    }
                })
                //.addClass( "ui-widget ui-widget-content ui-corner-left" );

            input.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                return jQuery( "<li></li>" )
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + "</a>" )
                    .appendTo( ul );
            };

            jQuery( "<a>&nbsp;</a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .insertAfter( input )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "ui-corner-right ui-button-icon" )
                .click(function() {
                    // close if already visible
                    if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                        input.autocomplete( "close" );
                        return;
                    }

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                    input.focus();
                });
        }
    });

}


/** Toggle area visibility on/off.
 * @param link The <a> element calling this function
 * @param areaId The id of the HTML container to toggle
 * @param expandTxt Localized 'Expand' text
 * @param collapseTxt Localized 'Collapse' text
*/
function toggleCollapsiblePanel(link, areaId, expandTxt, collapseTxt){
   var container = jQuery("#" + areaId);
   var liElement = jQuery(link).parents('li:first');
    if (liElement) {
      if (container.is(':visible')) {
        liElement.removeClass('expanded');
        liElement.addClass('collapsed');
        link.title = expandTxt;
      } else {
        liElement.removeClass('collapsed');
        liElement.addClass('expanded');
        link.title = collapseTxt;
      }
    }
   container.animate({opacity: 'toggle', height: 'toggle'}, "slow");
}

/** Toggle screenlet visibility on/off.
 * @param link The <a> element calling this function
 * @param areaId The id of the HTML container to toggle
 * @param expandTxt Localized 'Expand' text
 * @param collapseTxt Localized 'Collapse' text
*/
function toggleScreenlet(link, areaId, saveCollapsed, expandTxt, collapseTxt){
   toggleCollapsiblePanel(link, areaId, expandTxt, collapseTxt);
   var screenlet = jQuery(link).parents('div:eq(1)').attr('id');
   var title = jQuery(link).attr('title');
   if(title == expandTxt){
       var currentParam = screenlet + "_collapsed=false";
       var newParam = screenlet + "_collapsed=true";
       if(saveCollapsed=='true'){
           setUserLayoutPreferences('GLOBAL_PREFERENCES',screenlet+"_collapsed",'true');
       }
   } else {
       var currentParam = screenlet + "_collapsed=true";
       var newParam = screenlet + "_collapsed=false";
       if(saveCollapsed=='true'){
           setUserLayoutPreferences('GLOBAL_PREFERENCES',screenlet+"_collapsed",'false');
       }
   }
   var paginationMenus = jQuery('div.nav-pager');
   jQuery.each(paginationMenus, function(menu) {
       if (menu) {
           var childElements = menu.getElementsByTagName('a');
           for (var i = 0; i < childElements.length; i++) {
               if (childElements[i].href.indexOf("http") == 0) {
                   childElements[i].href = replaceQueryParam(childElements[i].href, currentParam, newParam);
               }
           }
           childElements = menu.getElementsByTagName('select');
           for (i = 0; i < childElements.length; i++) {
               if (childElements[i].href.indexOf("location.href") >= 0) {
                   Element.extend(childElements[i]);
                   childElements[i].writeAttribute("onchange", replaceQueryParam(childElements[i].readAttribute("onchange"), currentParam, newParam));
               }
           }
       }
   });
}

/** In Place Editor for display elements
  * @param element The id of the display field
  * @param url The request to be called to update the display field
  * @param options Options to be passed to Ajax.InPlaceEditor
  * https://cwiki.apache.org/confluence/display/OFBIZ/Enhancing+Display+Widget+to+use+Ajax.InPlaceEditor
*/

function ajaxInPlaceEditDisplayField(element, url, options) {
    var jElement = jQuery("#" + element);
    jElement.mouseover(function() {
        jQuery(this).css('background-color', 'rgb(255, 255, 153)');
    });

    jElement.mouseout(function() {
        jQuery(this).css('background-color', 'transparent');
    });

    jElement.editable(function(value, settings){
        // removes all line breaks from the value param, because the parseJSON Function can't work with line breaks
        value = value.replace(/\n/g, " ");
        value = value.replace(/\"/g,"&quot;");

        var resultField = jQuery.parseJSON('{"' + settings.name + '":"' + value + '"}');
        // merge both parameter objects together
        jQuery.extend(settings.submitdata, resultField);
        jQuery.ajax({
            type : settings.method,
            url : url,
            data : settings.submitdata,
            success : function(data) {
                // adding the new value to the field and make the modified field 'blink' a little bit to show the user that somethink have changed
                jElement.html(value).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).css('background-color', 'transparent');
            }
        });
    }, options);
}

// ===== End of Ajax Functions ===== //

function replaceQueryParam(queryString, currentParam, newParam) {
    var result = queryString.replace(currentParam, newParam);
    if (result.indexOf(newParam) < 0) {
        if (result.indexOf("?") < 0) {
            result = result + "?" + newParam;
        } else if (result.endsWith("#")) {
            result = result.replace("#", "&" + newParam + "#");
        } else if (result.endsWith(";")) {
            result = result.replace(";", " + '&" + newParam + "';");
        } else {
            result = result + "&" + newParam;
        }
    }
    return result;
}

function submitFormDisableSubmits(form) {
    for (var i=0;i<form.length;i++) {
        var formel = form.elements[i];
        if (formel.type == "submit") {
            submitFormDisableButton(formel);
            var formName = form.name;
            var formelName = formel.name;
            var timeoutString = "submitFormEnableButtonByName('" + formName + "', '" + formelName + "')";
            var t = setTimeout(timeoutString, 1500);
        }
    }
}

// prevents doubleposts for <submit> inputs of type "button" or "image"
function submitFormDisableButton(button) {
    if (button.form.action != null && button.form.action.length) {
        button.disabled = true;
    }
    button.className = button.className + " disabled";
    button.value = button.value + "*";
}

function submitFormEnableButtonByName(formName, buttonName) {
    var form = document[formName];
    var button = form.elements[buttonName];
    submitFormEnableButton(button);
}
function submitFormEnableButton(button) {
    button.disabled = false;
    button.className = button.className.substring(0, button.className.length - " disabled".length);
    button.value = button.value.substring(0, button.value.length - 1);
}

/**
 * Expands or collapses all groups of one portlet
 *
 * @param bool <code>true</code> to expand, <code>false</code> otherwise
 * @param portalPortletId The id of the portlet
 */
function expandAllP(bool, portalPortletId) {
    jQuery('#scrlt_'+portalPortletId+' .fieldgroup').each(function() {
        var titleBar = $(this).children('.fieldgroup-title-bar'), body = $(this).children('.fieldgroup-body');
        if (titleBar.children().length > 0 && body.is(':visible') != bool) {
            toggleCollapsiblePanel(titleBar.find('a'), body.attr('id'), 'expand', 'collapse');
        }
    });
}

/**
 * Expands or collapses all groups of the page
 *
 * @param bool <code>true</code> to expand, <code>false</code> otherwise
 */
function expandAll(bool) {
    jQuery('.fieldgroup').each(function() {
        var titleBar = $(this).children('.fieldgroup-title-bar'), body = $(this).children('.fieldgroup-body');
        if (titleBar.children().length > 0 && body.is(':visible') != bool) {
            toggleCollapsiblePanel(titleBar.find('a'), body.attr('id'), 'expand', 'collapse');
        }
    });
}

//calls ajax request for storing user layout preferences
function setUserLayoutPreferences(userPrefGroupTypeId, userPrefTypeId, userPrefValue){
    jQuery.ajax({
        url:'ajaxSetUserPreference',
        type: "POST",
        data: ({userPrefGroupTypeId: userPrefGroupTypeId, userPrefTypeId: userPrefTypeId, userPrefValue: userPrefValue}),
        success: function(data) {}
    });
}

function waitSpinnerShow() {
    jSpinner = jQuery("#wait-spinner");
    if (!jSpinner.length) return

    bdy = document.body;
    lookupLeft = (bdy.offsetWidth / 2) - (jSpinner.width() / 2);
    scrollOffY = jQuery(window).scrollTop();
    winHeight = jQuery(window).height();
    lookupTop = (scrollOffY + winHeight / 2) - (jSpinner.height() / 2);

    jSpinner.css("display", "block");
    jSpinner.css("left", lookupLeft + "px");
    jSpinner.css("top", lookupTop + "px");
    jSpinner.show();
}

function waitSpinnerHide() {
    jQuery("#wait-spinner").hide()
}

/**
 * Reads the requiered uiLabels from the uiLabelXml Files
 * FIXME: Scipio: Method requires sync ajax if it's going to return a value (added); should find a better way to write this
 * @param requiredLabels JSON Object {resource : [label1, label2 ...], resource2 : [label1, label2, ...]}
 * @return JSON Object
 */
function getJSONuiLabels(requiredLabels) {
    var returnVal = {};
    var requiredLabelsStr = JSON.stringify(requiredLabels);

    if (requiredLabels != null && requiredLabels != "") {
        jQuery.ajax({
            url: getOfbizUrl("getJSONuiLabelArray"),
            type: "POST",
            async: false,
            data: {"requiredLabels" : requiredLabelsStr},
            success: function(data) {
                returnVal = data;
            }
        });
    }

    return returnVal;
}

/**
 * Scipio: reads the required ui labels and returns as an object similar to screen uiLabelMap, with all labels in root map.
 * @param requiredLabels JSON Object {resource : [label1, label2 ...], resource2 : [label1, label2, ...]}
 * @return JSON Object
 */
function getJSONuiLabelMap(requiredLabels) {
    var returnVal = {};
    var labelArrays = getJSONuiLabels(requiredLabels);
    
    jQuery.each(requiredLabels, function(labelCollection, labelNameArray) {
        jQuery.each(labelNameArray, function(index, labelName) {
            returnVal[labelName] = labelArrays[labelCollection][index];
        });
    });
    
    return returnVal;
}


/**
 * Read the requiered uiLabel from the uiLabelXml Resource
 * FIXME: Scipio: Method requires sync ajax if it's going to return a value (added); should find a better way to write this
 * @param uiResource String
 * @param errUiLabel String
 * @returns String with Label
 */
function getJSONuiLabel(uiResource, errUiLabel) {
    requiredLabel = {};
    requiredLabel[uiResource] = errUiLabel;

    var returnVal = "";
    var requiredLabelStr = JSON.stringify(requiredLabel);

    if (requiredLabel != null && requiredLabel != "") {
        jQuery.ajax({
            url: getOfbizUrl("getJSONuiLabel"),
            type: "POST",
            async: false,
            data: {"requiredLabel" : requiredLabelStr},
            success: function(data) {
                returnVal = data[0];
            }
        });
    }
    return returnVal;
}

/**
 * Opens an alert alert box with an i18n error message
 * @param errBoxTitleResource String - Can be empty
 * @param errBoxTitleLabel String - Can be empty
 * @param uiResource String - Required
 * @param errUiLabel String - Required
 */
function showErrorAlertLoadUiLabel(errBoxTitleResource, errBoxTitleLabel, uiResource, errUiLabel) {
    if (uiResource == null || uiResource == "" || uiResource == undefined || errUiLabel == null || errUiLabel == "" || errUiLabel == undefined) {
        // No Label Information are set, Error Msg Box can't be created
        return;
    }

    var labels = {};
    var useTitle = false;
    // title can only be set when the resource and the label are set
    if (errBoxTitleResource != null && errBoxTitleResource != "" && errBoxTitleLabel != null && errBoxTitleLabel != "") {
        // create the JSON Object
        if (errBoxTitleResource == uiResource) {
            labels[errBoxTitleResource] = [errBoxTitleLabel, errUiLabel];
        } else {
            labels[errBoxTitleResource] = [errBoxTitleLabel];
            labels[uiResource] = [errUiLabel];
        }
        useTitle = true;
    } else {
        labels[uiResource] = [errUiLabel];
    }
    // request the labels
    labels = getJSONuiLabels(labels);

    var errMsgBox = jQuery("#contentarea").after(jQuery("<div id='errorAlertBox'></div>"));

    if (errMsgBox.length) {
        errMsgBox.dialog({
            modal: true,
            title: function() {
                if (useTitle) {
                    return labels[errBoxTitleResource][0]
                } else {
                    return ""
                }
            },
            open : function() {
                var positionInArray = 0;
                if (errBoxTitleResource == uiResource) {
                    positionInArray = 1;
                }
                errMsgBox.html(labels[uiResource][positionInArray]);
            },
            buttons: {
                Ok: function() {
                    errMsgBox.remove();
                    jQuery( this ).dialog( "close" );
                }
            }
        });
    } else {
        alert(labels[uiResource][0]);
    }
}

/**
 * Opens an alert alert box. This function is for a direct call from the ftl files where you can direcetly resolve youre labels
 * @param errBoxTitle String - Can be empty
 * @param errMessage String - Required - i18n Error Message
 */
function showErrorAlert(errBoxTitle, errMessage) {
    if (errMessage == null || errMessage == "" || errMessage == undefined ) {
        // No Error Message Information is set, Error Msg Box can't be created
        return;
    }

    // Scipio: FIXME: The code below this is currently not working, so just show an alert box for time being
    alert(errMessage);
    return;
    /*
    
    var errMsgBox = jQuery("#contentarea").after(jQuery("<div id='errorAlertBox'>" + errMessage + "</div>"));

    if (errMsgBox.length) {
        errMsgBox.dialog({
            modal: true,
            title: errBoxTitle,
            buttons: {
                Ok: function() {
                    errMsgBox.remove();
                    jQuery( this ).dialog( "close" );
                }
            }
        });
    }
    */
}

/**
 * Submit the pagination request
 * @param obj The DOM object of pagination anchor or select element
 * @param url The pagination URL
 */
function submitPagination(obj, url) {
    if (obj.getAttribute("data-lookupajax") == "true" && typeof window.lookupPaginationAjaxRequest == "function") {
        lookupPaginationAjaxRequest(url, (obj.tagName == "SELECT" ? "select" : "link"));
        return false;
    }
    if (url.length > 2000) {
        return submitPaginationPostForm(obj, url);
    } else {
        if (obj.tagName == "SELECT") {
            location.href = url;
            return false;
        } else {
            obj.href = url;
            return true;
        }
    }
}

/**
 * Scipio: Submit the pagination request, always as a POST request of some type.
 * @param obj The DOM object of pagination anchor or select element
 * @param url The pagination URL
 */
function submitPaginationPost(obj, url) {
    if (obj.getAttribute("data-lookupajax") == "true" && typeof window.lookupPaginationAjaxRequest == "function") {
        lookupPaginationAjaxRequest(url, (obj.tagName == "SELECT" ? "select" : "link"));
        return false;
    }
    return submitPaginationPostForm(obj, url);
}

/**
 * Scipio: Submit the pagination request, always specifically as a POST form.
 * @param obj The DOM object of pagination anchor or select element
 * @param url The pagination URL
 */
function submitPaginationPostForm(obj, url) {
    var request = url.substring(0, url.indexOf("?"));
    var params = url.substring(url.indexOf("?")+1, url.length);
    var paramsArray = params.split("&");
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", request);
    for (var i = 0; i < paramsArray.length; i ++) {
        var param = paramsArray[i];
        if (param!= "" && param.indexOf("=") > 0) {
            var keyValue = param.split("=");
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", keyValue[0]);
            hiddenField.setAttribute("value", keyValue[1]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
    return false;
}

/**
 * SCIPIO: Helper for date fields, each field new instance.
 * Manages a hidden "real" date input from a display "I18n" date input, the latter of which
 * is managed by a datepicker (sometimes not).
 * Date formats are in moment.js format (e.g. YYYY-MM-DD HH:mm:ss.SSS).
 */
function ScpFieldDateHelper(options) {
    var sfdh = this;
    var opts = options ? $.extend({}, options) : {};

    //opts.displayInputId = options.displayInputId;
    //opts.inputId = options.inputId;
    opts.displayCorrect = (options.displayCorrect === true); // mostly for fdatepicker
    opts.useFillDate = (options.useFillDate === true); // mostly for fdatepicker; should be false if displayCorrect false
    opts.clearDispOnError = (options.clearDispOnError === true); // (default: false) if true and parse error, display input is cleared (hidden always cleared)
    //opts.dateFmt = options.dateFmt; // the internal format, e.g. full timestamp
    //opts.dateDisplayFmt = options.dateDisplayFmt; // the format implemented by the datepicker, e.g. YYYY-MM-DD 
    opts.dateEffDispFmt = options.dateEffDispFmt || options.dateDisplayFmt; // the format written by displayCorrect feature, e.g. full timestamp minus ss.SSS
    this.codes = options.codes || {};
    if (!this.codes.invalid) this.codes.invalid = "Invalid";
    
    this.opts = opts; // for subclasses
    this.oldDate = '';

    // inFmts is array of date format strings passed as moment(date, format) to read
    // from display field and avoid the moment(date) call - see dateCommonToNorm and dateToFmt.
    // by default we'll set the internal and display formats for the field, should
    // 'just work' in most cases.
    if (typeof opts.inFmts === 'undefined') {
        opts.inFmts = [opts.dateFmt];
        if (opts.dateEffDispFmt !== opts.dateFmt) opts.inFmts.push(opts.dateEffDispFmt);
        if (opts.dateDisplayFmt !== opts.dateFmt && opts.dateDisplayFmt !== opts.dateEffDispFmt) opts.inFmts.push(opts.dateDisplayFmt);
    }
    if (typeof opts.inNormFmts === 'undefined') opts.inNormFmts = opts.dateFmt;
    if (typeof opts.inI18nFmts === 'undefined') opts.inI18nFmts = opts.inFmts;

    // CORE HELPERS
    
    this.isDate = function(obj) {
        return moment.isMoment(obj);
    };
    
    /**
     * Converts date to format fmt.
     * NOTE: srcFmt should not be omitted - if omitted, 
     * the non-cross-platform-compapatible moment(date) call is done instead,
     * which is recommended against - see moment.js docs.
     */
    this.dateToFmt = function(fmt, date, srcFmt) {
        if (fmt) {
            var mDate = sfdh.parseDate(date, srcFmt);
            //alert('parsing: [date: ' + date + '] [fmt: ' + srcFmt + '] [res: ' + mDate + '] [valid: ' + mDate.isValid() + ']');
            if (mDate.isValid()) return mDate.format(fmt);
        }
        return null;
    };
    this.parseDateOrNull = function(date, srcFmt) {
        var mDate = sfdh.parseDate(date, srcFmt);
        if (mDate.isValid()) return mDate;
        else return null;
    };
    this.parseDate = function(date, srcFmt) {
        if (sfdh.isDate(date)) return date;
        else if (srcFmt) return moment(date, srcFmt);
        else return moment(date); // non-cross-browser-compatible
    };
    
    /**
     * Fills the date by the trailing digits of fillDate, if the formats are compatible.
     * This is a BASIC fill only, such that the fmt must be substring of fillFmt.
     * If not doable, returns null.
     * If present, fillDate is assumed to be valid and match fillFmt (usually comes from internal pre-converted).
     * TODO: this could be done with more complex support for differing formats of fmt and fillFmt, but very complex.
     */
    this.fillDateFmt = function(fmt, date, fillFmt, fillDate) {
        // FIXME?: if date is already moment, we could be losing info here by using fmt instead of fillFmt...
        // but using fillFmt would prevent this from running entirely...
        if (sfdh.isDate(date) && fmt) date = date.format(fmt);
        if (sfdh.isDate(fillDate) && fillFmt) fillDate = fillDate.format(fillFmt);
        if (fmt && fillFmt && fillDate && (fillDate.length > date.length) && (fillFmt.lastIndexOf(fmt, 0) === 0)) {
            // guard against user input, whereas fillDate assumed to be valid (internal)
            var targetFmt = (date.length >= fillFmt.length) ? fillFmt : fillFmt.substring(0, date.length);
            var mDate = moment(date, targetFmt); // strict
            if (mDate.isValid()) {
                date = mDate.format(targetFmt); // make sure
                if (fillDate.length > date.length) {
                    return date + fillDate.substr(date.length);
                }
            }
        }
        return null;
    };
    
    
    // COMMON FIELD EVENT HANDLERS - can be overridden
    
    /**
     * Parse any date format associated with this field to a Moment.
     * If already a moment returns as-is. May return null.
     */
    this.dateCommonParse = function(date, srcFmt) {
        return sfdh.parseDateOrNull(date, srcFmt || opts.inFmts);
    };
    
    /**
     * Converts date (string or moment) to normalized internal/hidden format (e.g. timestamp). May return null.
     */
    this.dateCommonToNorm = function(date, srcFmt) {
        return sfdh.dateToFmt(opts.dateFmt, date, srcFmt || opts.inFmts);
    };
    /**
     * Converts date (string or moment) to display field format. May return null.
     */
    this.dateCommonToI18n = function(date, srcFmt) {
        return sfdh.dateToFmt(opts.dateDisplayFmt, date, srcFmt || opts.inFmts);
    };
    /**
     * Converts date (string or moment) to effective display field format (used by displayCorrect). May return null.
     */
    this.dateCommonToEffI18n = function(date, srcFmt) {
        return sfdh.dateToFmt(opts.dateEffDispFmt, date, srcFmt || opts.inFmts);
    };
    
    /**
     * Needed for pickers/dates that don't have "old date" variables around;
     * can trigger this on popup/show.
     */
    this.saveOldDateFromI18n = function() {
        sfdh.oldDate = sfdh.dateCommonToNorm(jQuery('#'+opts.displayInputId).val(), opts.inI18nFmts) || '';
    };

    this.saveOldDateFromNorm = function() {
        sfdh.oldDate = jQuery('#'+opts.inputId).val() || ''; // already in right format
    };
    
    this.getNormDateInst = function() {
        return sfdh.dateCommonToNorm(jQuery('#'+opts.inputId).val(), opts.inNormFmts);
    };
    
    this.getNormDateRaw = function() {
        return jQuery('#'+opts.inputId).val();
    };
    
    this.getI18nDateRaw = function() {
        return jQuery('#'+opts.displayInputId).val();
    };
    
    /**
     * Default date-filling behavior, or returns date as-is.
     * Tries to extend a dateDisplayFmt date using a bigger dateEffDispFmt fillDate.
     * NOTE: dates may be moment or string.
     */
    this.doFillDate = function(date, fillDate) {
        var resDate = sfdh.fillDateFmt(opts.dateDisplayFmt, date, opts.dateEffDispFmt, fillDate);
        if (resDate != null) {
            resDate = sfdh.dateCommonParse(resDate, opts.dateEffDispFmt);
            if (resDate != null) return resDate;
        } 
        return date;
    };
    
    /**
     * Updates the hidden input.
     * Should be called on displayInputId change event, if possible.
     * 
     * NOTE: null/undefined date is current treated as error/NaN. Pass empty string for empty value.
     * However if you want to pass explicit error, you should pass a NaN moment instead, due to future changes.
     * NOTE: Invalid dates and parsing (NaN from moment.js) is handled by setting a dummy "Invalid" value for the hidden input.
     * This is currently the only reliable way to signal to server that something went wrong; can't put empty because 
     * would be interpreted as success or missing value instead (much more confusing); and we don't have access to
     * the original date string from here in all cases (which could cause less predictable behavior) and
     * in cases where there is conversion between hidden and display inputs it makes no sense to set the 
     * original value (risk of further mishandling on server-side).
     * TODO?: could try to detect some cases where safe to send the orig value after convert fail, 
     * but more effort than worth...
     */
    this.updateNormDateInput = function(date, srcFmt) {
        var outDate = (date) ? sfdh.dateCommonToNorm(date, srcFmt) : date;
        if (outDate == null) outDate = sfdh.codes.invalid;
        jQuery('#'+opts.inputId).val(outDate || '');
    };
    
    this.updateNormDateInputFromI18n = function(date) {
        sfdh.updateNormDateInput(date, opts.inI18nFmts);
    };
    
    /**
     * Updates the display input.
     * Normally should only be called if displayCorrect is on.
     */
    this.updateI18nDateInput = function(date, srcFmt) {
        if (date) date = sfdh.dateCommonToEffI18n(date, srcFmt);
        if (date != null || opts.clearDispOnError) { // empty string always sets val, but null only does if clearDispOnError
            jQuery('#'+opts.displayInputId).val(date || '');
        }
    };
    
    /**
     * MAIN CHANGE/UPDATE CALLBACK, may update both or either hidden and display inputs.
     * args: date (moment or string), srcFmt, oldDate (always in dateFmt or moment), 
     * skipNormUp, useFillDate.
     * NOTE: null/undefined date are interpreted as error (same as invalid moment); boolean or empty string represent empty value.
     * However if you want to pass explicit error, you should pass a NaN moment instead, due to future changes.
     * If srcFmt is different than opts.inI18nFmts or opts.dateDisplayFmt, then useFillDate should be forced to false
     * because it only works with date in opts.dateDisplayFmt (and its result is in opts.dateEffDispFmt).
     */
    this.updateAllDateInputs = function(args) {
        if (!args) args = {};
        var date = args.date;
        if (typeof date === 'boolean') date = '';
        
        var normDate = date;
        if (date) {
            var srcFmt = args.srcFmt || opts.inI18nFmts;
            
            // NOTE: fill date is limited and assumes opts.dateDisplayFmt as source format - pass false if doesn't match
            if (args.useFillDate !== false && opts.useFillDate) { // mostly for fdatepicker, should only be enabled if displayCorrect
                var oldDate = args.oldDate;
                if (oldDate && oldDate !== true) {
                    if ($.type(oldDate) === 'string') {
                        // old date is in dateFmt, but we need it in dateEffDispFmt fmt
                        oldDate = sfdh.dateCommonToEffI18n(oldDate, opts.inNormFmts);
                    }
                    date = sfdh.doFillDate(date, oldDate);
                }
            }
            
            normDate = sfdh.dateCommonParse(date, srcFmt);
            // NOTE: if normDate null, will be handled by calls below
        }
        
        var skipNormUp = args.skipNormUp;
        if (typeof skipNormUp === 'function') skipNormUp = skipNormUp(normDate);
        if (skipNormUp !== true) {
            // 2018-03: do this immediate by default, 
            // because change events on displayInputId elem not guaranteed
            sfdh.updateNormDateInput(normDate, null);
        }
        
        if (opts.displayCorrect) {
            sfdh.updateI18nDateInput(normDate, null);
        }
    };
    
    /**
     * Gets date and oldDate from default implementation pattern.
     */
    this.getDefUpAllInputArgs = function() {
        return {date: sfdh.getI18nDateRaw(), oldDate:sfdh.oldDate};
    };
    
}

/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertToDateTimeNorm(date, fillerDate) {
    date = date.trim();
    if (!date) {
        return "";
    }
    var zeroPat = "0000-00-00 00:00:00.000";
    var result;
    if (fillerDate && fillerDate.match(/^\d\d\d\d-\d\d-\d\d\s/)) {
       if (date.length >= fillerDate.length) {
           result = date;
       }
       else {
           // preserve everything after days
           result = date + fillerDate.substr(date.length);
       }
    }
    else {
       if (date.length >= zeroPat.length) {
           result = date;
       }
       else {
           // append zeroes
           result = date + zeroPat.substr(date.length);
       }
    }
    return result;
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertToDateNorm(date, fillerDate) {
    date = date.trim();
    if (!date) {
        return "";
    }
    var zeroPat = "0000-01-01";
    var result;
    if (fillerDate && fillerDate.match(/^\d\d\d\d-\d\d-\d\d$/)) {
       if (date.length >= fillerDate.length) {
           result = date;
       }
       else {
           result = date + fillerDate.substr(date.length);
       }
    }
    else {
       if (date.length >= zeroPat.length) {
           result = date;
       }
       else {
           // append zeroes
           result = date + zeroPat.substr(date.length);
       }
    }
    // TRUNCATE to ensure correctness
    if (result.length > zeroPat.length) {
        result = result.substring(0, zeroPat.length);
    }
    return result;
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertToTimeNorm(time, fillerTime) {
    time = time.trim();
    if (!time) {
        return "";
    }
    var zeroPat = "00:00:00.000";
    var result;
    time = time.replace("h", ":");
    result = time;
    return result;
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertToMonthNorm(date, fillerDate) {
    date = date.trim();
    if (!date) {
        return "";
    }
    var zeroPat = "0000-01";
    var result;
    if (fillerDate && fillerDate.match(/^\d\d\d\d-\d\d$/)) {
       if (date.length >= fillerDate.length) {
           result = date;
       }
       else {
           result = date + fillerDate.substr(date.length);
       }
    }
    else {
       if (date.length >= zeroPat.length) {
           result = date;
       }
       else {
           // append zeroes
           result = date + zeroPat.substr(date.length);
       }
    }
    if (result.length > zeroPat.length) {
        result = result.substring(0, zeroPat.length);
    }
    return result;
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertToDateTypeNorm(dateType, date, fillerDate) {
    if (dateType == "timestamp") {
        return convertToDateTimeNorm(date, fillerDate);
    } else if (dateType == "date") {
        return convertToDateNorm(date, fillerDate);
    } else if (dateType == "time") {
        return convertToTimeNorm(date, fillerDate);
    } else if (dateType == "month") {
        return convertToMonthNorm(date, fillerDate);
    } else {
        return date;
    }
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertFieldDateDisplayToNorm(dateType, date) {
    if (dateType == "timestamp") {
        return moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    } else if (dateType == "date") {
        return moment(date).format('YYYY-MM-DD');
    } else if (dateType == "time") {
        return moment(date).format('HH:mm:ss.SSS');
    } else if (dateType == "month") {
        return moment(date).format('YYYY-MM');
    } else {
        return date;
    }
}
/**
 * @deprecated 2018-03: replaced by ScpFieldDateHelper, do not use anymore
 */
function convertFieldDateNormToDisplay(format, date) {
    return date;
}


