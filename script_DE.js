'use strict';

const file_path = "DataFinal_DE.csv";
const table = document.querySelector(".data-table");
const container = document.querySelector(".container");
const date = document.querySelector(".date");
const retailer = document.querySelector(".retailer");

const retail = {
    voda: {
        A_plan_type: [],
        B_data_type: ['Unlimited Data', 'Sim - Free'],
        // C_promo_type: ['Bundle', 'Cashback', 'Free Subscription ', 'Gift Card', 'Merchandise', 'Rate Plan Discount(Max)', 'Trade-in Bump-up', 'WoW Price Change']
        C_promo_type: []
    },
    media_markt: {
        A_plan_type: [],
        B_data_type: ['NULL', 'Vodafone', 'O2', 'Telekom'],
        // C_promo_type: ['Bundle Deal', 'CashBack / Deduction', 'Free Merchandise', 'Free Subscription', 'Gift Card', 'Monthly Cost', 'One Time Cost', 'Switcher', 'Trade-In', 'WoW Price Change']
        C_promo_type: []
    },
    deutsch: {
        A_plan_type: [],
        B_data_type: ['Unlimited Data', 'Sim - Free'],
        // C_promo_type: ['Bundle', 'Cashback', 'Free Subscription', 'Gift Card', 'Merchandise', 'Trade-in Bump-up', 'Unique Discount', 'WoW Price Change']
        C_promo_type: []
    },
}

// const model_filter = ['Google Pixel 7 Pro', 'Apple iPhone 14 Pro', 'Apple iPhone 14 Plus', 'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S23+', 'Samsung Galaxy Z Flip4', 'Google Pixel 7', 'Apple iPhone 14', 'Samsung Galaxy S22', 'Samsung Galaxy S23', 'Google Pixel 7a', 'Apple iPhone SE3', 'Samsung Galaxy A54', 'Samsung Galaxy A34',]
fetch(file_path).then(res => res.text()).then(data => {

    const dataArr = data.trim().split("\n").map(row => row.replace("\r", "").split(",")).slice(1);

    dataArr.forEach(row => {
        if (row.length > 12) console.log(row);
        if (row.length < 12) console.log(row);
    });

    console.log('Lengths:', [...new Set(dataArr.map(row => row.length))]);
    const dates = [...new Set(dataArr.map(row => row[9]))]
    console.log("Dates:", dates);

    const retailers = dataArr.map(row => row[10]).filter((value, index, self) => self.indexOf(value) === index).filter(row => row != undefined);
    let random = Math.floor(Math.random() * 3);
    switch (random) {
        case 0:
            vodafonede(dataArr, dates[0]);
            break;
        case 1:
            mediamarkt(dataArr, dates[0]);
            break;
        case 2:
            deutsch(dataArr, dates[0]);
            break;
    }
    const select = document.createElement("select");
    select.setAttribute("class", "dates");
    select.setAttribute("id", "dates");
    select.setAttribute("name", "dates");
    const option = document.createElement("option");
    option.setAttribute("value", "Select Date");
    option.innerHTML = "Select Date";
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
    for (let i = 0; i < dates.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", dates[i]);
        option.innerHTML = dates[i];
        select.appendChild(option);
    }
    date.appendChild(select);

    const select_retailer = document.createElement("select");
    select_retailer.setAttribute("class", "retailers");
    select_retailer.setAttribute("id", "retailers");
    select_retailer.setAttribute("name", "retailers");
    const option_retailer = document.createElement("option");
    option_retailer.setAttribute("value", "Select Retailer");
    option_retailer.innerHTML = "Select Retailer";
    option_retailer.disabled = true;
    option_retailer.selected = true;
    select_retailer.appendChild(option_retailer);
    for (let i = 0; i < retailers.length; i++) {
        const option_retailer = document.createElement("option");
        option_retailer.setAttribute("value", retailers[i]);
        option_retailer.innerHTML = retailers[i];
        select_retailer.appendChild(option_retailer);
    }
    retailer.appendChild(select_retailer);

    const dates_select = document.querySelector(".dates");
    const retailers_select = document.querySelector(".retailers");

    dates_select.addEventListener("change", (e) => {
        if (retailers_select.value != "Select Retailer" && dates_select.value != "Select Date") {
            table.innerHTML = "";
            if (retailers_select.value == "Vodafone") {
                vodafonede(dataArr, dates_select.value);
            }
            if (retailers_select.value == "Mediamarkt") {
                mediamarkt(dataArr, dates_select.value);
            }
            if (retailers_select.value == "Deutsch" || retailers_select.value == "Deutsche") {
                deutsch(dataArr, dates_select.value);
            }
        }
    });

    retailers_select.addEventListener("change", (e) => {
        if (retailers_select.value != "Select Retailer" && dates_select.value != "Select Date") {
            table.innerHTML = "";
            if (retailers_select.value == "Vodafone") {
                vodafonede(dataArr, dates_select.value);
            }
            if (retailers_select.value == "Mediamarkt") {
                mediamarkt(dataArr, dates_select.value);
            }
            if (retailers_select.value == "Deutsch" || retailers_select.value == "Deutsche") {
                deutsch(dataArr, dates_select.value);
            }
        }
    });

});

function vodafonede(dataArr, selected_date) {
    let model_filter = [
        'Google Pixel 7 Pro',
        'Apple iPhone 14 Pro',
        'Apple iPhone 14 Plus',
        'Samsung Galaxy S23 Ultra',
        'Samsung Galaxy S23+',
        'Samsung Galaxy Z Flip4',
        'Google Pixel 7',
        'Apple iPhone 14',
        'Samsung Galaxy S22',
        'Samsung Galaxy S23',
        'Google Pixel 7a',
        'Apple iPhone SE3',
        'Samsung Galaxy A54',
        'Samsung Galaxy A34',
    ]

    const voda_de_data = dataArr.filter(row => row[10].toLowerCase() === "Vodafone".toLowerCase() && row[9] === selected_date && model_filter.includes(row[5]))
    const promo_type_unique = [...new Set(voda_de_data.map(row => row[4].trim()))];
    retail.voda.C_promo_type = [];

    promo_type_unique.forEach(promo_type => {
        retail.voda.C_promo_type.push(promo_type);
    });

    const google_filter_data = voda_de_data.filter(row => row[5] == 'Google Pixel 7 Pro' || row[5] == 'Google Pixel 7' || row[5] == 'Google Pixel 7a');

    if (![...new Set(google_filter_data.map(row => row[5]))].includes('Google Pixel 7a')) {
        model_filter = [
            'Google Pixel 7 Pro',
            'Apple iPhone 14 Pro',
            'Apple iPhone 14 Plus',
            'Samsung Galaxy S23 Ultra',
            'Samsung Galaxy S23+',
            'Samsung Galaxy Z Flip4',
            'Google Pixel 7',
            'Apple iPhone 14',
            'Samsung Galaxy S22',
            'Samsung Galaxy S23',
        ]
    }
    const tr_model = document.createElement("tr");

    const td_space = document.createElement("td");
    td_space.innerHTML = "";
    td_space.setAttribute("colspan", "2");
    tr_model.appendChild(td_space);

    model_filter.forEach(model => {
        const td = document.createElement("td");
        td.innerHTML = model;
        td.style.backgroundColor = model.includes("Google") ? "rgb(216, 215, 216)" : 'rgb(162, 189, 247)';
        tr_model.appendChild(td);
    });
    table.appendChild(tr_model);

    // const filter_pl = voda_uk_data.filter(row => (row[2] == 'Phone Plan Amount' || row[2] == 'PayG Discount  128 GB') && model_filter.includes(row[5]));

    // const tr_fil = document.createElement("tr");
    // const td_fil = document.createElement("td");
    // td_fil.innerHTML = filter_pl[0][2];
    // td_fil.setAttribute("colspan", "3");
    // tr_fil.appendChild(td_fil);
    // for (let i = 0; i < model_filter.length; i++) {
    //     const td = document.createElement("td");
    //     if (i > filter_pl.length - 1) {
    //         td.innerHTML = "-";
    //         td.style.backgroundColor = 'rgb(250, 242, 199)';
    //     } else {
    //         td.innerHTML = filter_pl[i][6] == 0 ? "-" : filter_pl[i][6];
    //         td.style.backgroundColor = colors({
    //             google_model: google_filter_data,
    //             compare_model: filter_pl[i],
    //             plan_type: filter_pl[i][2],
    //             data_type: filter_pl[i][3],
    //             promo_type: filter_pl[i][4]
    //         });
    //     }
    //     tr_fil.appendChild(td);
    // }
    // table.appendChild(tr_fil);

    const plan_length = retail.voda.A_plan_type.length;
    const data_length = retail.voda.B_data_type.length;
    const promo_length = retail.voda.C_promo_type.length;

    for (let i = 0; i <= plan_length; i++) {
        const plan_data = retail.voda.A_plan_type[i];

        for (let j = 0; j < data_length; j++) {
            const data_type = retail.voda.B_data_type[j];

            for (let k = 0; k < promo_length; k++) {
                const tr_master = document.createElement("tr");
                const promo_type = retail.voda.C_promo_type[k];

                // if (i == 0 && j == 0 && k == 0) {
                //     const td = document.createElement("td");
                //     td.innerHTML = plan_data;
                //     td.setAttribute("rowspan", promo_length * 2);
                //     tr_master.appendChild(td);
                // }

                if (i == 0 && (j == 0 || j == 1) && k == 0) {
                    const td2 = document.createElement("td");
                    td2.innerHTML = data_type;
                    td2.setAttribute("rowspan", promo_length);
                    tr_master.appendChild(td2);
                }

                const td_master = document.createElement("td");
                td_master.innerHTML = promo_type;
                tr_master.appendChild(td_master);
                table.appendChild(tr_master);

                for (let k = 0; k < model_filter.length; k++) {
                    const filter = voda_de_data
                        .filter(row =>
                            // row[2].trim() == plan_data &&
                            row[3].trim() == data_type &&
                            row[4].trim() == promo_type &&
                            row[5].trim() == model_filter[k]
                        );
                    const td = document.createElement("td");
                    if (filter.length == 0) {
                        td.innerHTML = "-";
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: ['0', '0', plan_data, data_type, promo_type, model_filter[k], '0'],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    else {
                        td.innerHTML = filter[0][6] == 0 ? "-" : filter[0][6];
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: filter[0],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    tr_master.appendChild(td);
                    table.appendChild(tr_master);
                }
            }
        }
    }
}

function mediamarkt(dataArr, selected_date) {
    let model_filter = [
        'Google Pixel 7 Pro',
        'Apple iPhone 14 Pro',
        'Apple iPhone 14 Plus',
        'Samsung Galaxy S23 Ultra',
        'Samsung Galaxy S23+',
        'Samsung Galaxy Z Flip4',
        'Google Pixel 7',
        'Apple iPhone 14',
        'Samsung Galaxy S22',
        'Samsung Galaxy S23',
        'Google Pixel 7a',
        'Apple iPhone SE3',
        'Samsung Galaxy A54',
        'Samsung Galaxy A34',
    ]

    const media_market_de = dataArr.filter(row => row[10] === "Mediamarkt" && row[9] === selected_date)
        .filter(row => model_filter.includes(row[5]));

    const promo_type_unique = [...new Set(media_market_de.map(row => row[4].trim()))];
    retail.media_markt.C_promo_type = [];

    promo_type_unique.forEach(promo_type => {
        if (promo_type != "NULL")
            retail.media_markt.C_promo_type.push(promo_type);
    });

    console.log(promo_type_unique);

    const google_filter_data = media_market_de.filter(row => row[5] == 'Google Pixel 7 Pro' || row[5] == 'Google Pixel 7' || row[5] == 'Google Pixel 7a');
    if (![...new Set(google_filter_data.map(row => row[5]))].includes('Google Pixel 7a')) {
        model_filter = [
            'Google Pixel 7 Pro',
            'Apple iPhone 14 Pro',
            'Apple iPhone 14 Plus',
            'Samsung Galaxy S23 Ultra',
            'Samsung Galaxy S23+',
            'Samsung Galaxy Z Flip4',
            'Google Pixel 7',
            'Apple iPhone 14',
            'Samsung Galaxy S22',
            'Samsung Galaxy S23',
        ]
    }
    const tr_model = document.createElement("tr");

    const td_space = document.createElement("td");
    td_space.innerHTML = "";
    td_space.setAttribute("colspan", "3");
    tr_model.appendChild(td_space);

    model_filter.forEach(model => {
        const td = document.createElement("td");
        td.innerHTML = model;
        td.style.backgroundColor = model.includes("Google") ? "rgb(216, 215, 216)" : 'rgb(162, 189, 247)';
        tr_model.appendChild(td);
    });
    table.appendChild(tr_model);

    const plan_length = retail.media_markt.A_plan_type.length;
    const data_length = retail.media_markt.B_data_type.length;
    const promo_length = retail.media_markt.C_promo_type.length;

    for (let i = 0; i <= plan_length; i++) {
        const plan_data = retail.media_markt.A_plan_type[i];

        for (let j = 0; j < data_length; j++) {
            const data_type = retail.media_markt.B_data_type[j];

            for (let k = 0; k < promo_length; k++) {
                const tr_master = document.createElement("tr");
                const promo_type = retail.media_markt.C_promo_type[k];

                if (i == 0 && j == 0 && k == 0) {
                    const td2 = document.createElement("td");
                    td2.innerHTML = 'Without Contract';
                    td2.setAttribute("rowspan", promo_length);
                    td2.setAttribute("colspan", "2");
                    tr_master.appendChild(td2);
                }

                if (i == 0 && j == 1 && k == 0) {
                    const td2 = document.createElement("td");
                    td2.innerHTML = 'With Contract';
                    td2.setAttribute("rowspan", promo_length * data_length);
                    tr_master.appendChild(td2);
                }

                if ((i == 0 || i == 1 || i == 2) && (j == 1 || j == 2 || j == 3) && k == 0) {
                    const td2 = document.createElement("td");
                    td2.innerHTML = data_type;
                    td2.setAttribute("rowspan", promo_length);
                    tr_master.appendChild(td2);
                }

                const td_master = document.createElement("td");
                td_master.innerHTML = promo_type;
                tr_master.appendChild(td_master);
                table.appendChild(tr_master);
                for (let k = 0; k < model_filter.length; k++) {
                    const filter = media_market_de
                        .filter(row =>
                            row[3].trim() == data_type &&
                            row[4].trim() == promo_type &&
                            row[5].trim() == model_filter[k]
                        );
                    const td = document.createElement("td");
                    if (filter.length == 0) {
                        td.innerHTML = "-";
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: ['0', '0', plan_data, data_type, promo_type, model_filter[k], '0'],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    else {
                        td.innerHTML = filter[0][6] == 0 ? "-" : filter[0][6];
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: filter[0],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    tr_master.appendChild(td);
                    table.appendChild(tr_master);
                }
            }
        }
    }

    function colors({ google_model, compare_model, plan_type, data_type, promo_type }) {
        if (compare_model[5].includes("Google")) return 'rgb(216, 215, 216)'; // grey

        const pixel_7_pro = [
            'Google Pixel 7 Pro', 'Apple iPhone 14 Pro', 'Apple iPhone 14 Plus',
            'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S23+', 'Samsung Galaxy Z Flip4'];
        const pixel_7 = [
            'Google Pixel 7', 'Apple iPhone 14',
            'Samsung Galaxy S22', 'Samsung Galaxy S23'];

        const pixel_7a = ['Google Pixel 7a', 'Apple iPhone SE3', 'Samsung Galaxy A54', 'Samsung Galaxy A34',];
        const filter = google_model.filter(
            row =>
                row[3].trim() == data_type &&
                row[4].trim() == promo_type
        );
        let d = 0;
        let model_in_google = [...new Set(google_model.map(row => row[5]))];

        if (filter.length != 0) {
            if (pixel_7_pro.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7 Pro')) {
                d = filter[0][6];
            } else if (pixel_7.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7')) {
                d = filter[1][6];
            } else if (pixel_7a.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7a')) {
                d = filter[2][6];
            }
        } else {
            d = 0;
        }

        compare_model[6] = parseFloat(compare_model[6].toString().split(" ")[0]);
        d = parseFloat(d.toString().split(" ")[0]);

        if (compare_model[6] > d) return 'rgb(246, 207, 203)'; //red
        else if (compare_model[6] < d) return 'rgb(215, 230, 210)'; //green
        else if (d == 0 && compare_model[6] == 0) return 'rgb(250, 242, 199)'; //yellow
        else if (d != 0 && d == compare_model[6]) return 'rgb(250, 242, 199)'; //yellow
    }
}

function deutsch(dataArr, selected_date) {
    let model_filter = [
        'Google Pixel 7 Pro',
        'Apple iPhone 14 Pro',
        'Apple iPhone 14 Plus',
        'Samsung Galaxy S23 Ultra',
        'Samsung Galaxy S23+',
        'Samsung Galaxy Z Flip4',
        'Google Pixel 7',
        'Apple iPhone 14',
        'Samsung Galaxy S22',
        'Samsung Galaxy S23',
        'Google Pixel 7a',
        'Apple iPhone SE3',
        'Samsung Galaxy A54',
        'Samsung Galaxy A34',
    ]

    const deutsch_de_data = dataArr.filter(row => (row[10] === "Deutsch" || row[10] === "Deutsche") && row[9] === selected_date && model_filter.includes(row[5]))

    const promo_type_unique = [...new Set(deutsch_de_data.map(row => row[4].trim()))];
    retail.deutsch.C_promo_type = [];

    promo_type_unique.forEach(promo_type => {
        retail.deutsch.C_promo_type.push(promo_type);
    });
    console.log(promo_type_unique);
    const google_filter_data = deutsch_de_data.filter(row => row[5] == 'Google Pixel 7 Pro' || row[5] == 'Google Pixel 7' || row[5] == 'Google Pixel 7a');
    if (![...new Set(google_filter_data.map(row => row[5]))].includes('Google Pixel 7a')) {
        model_filter = [
            'Google Pixel 7 Pro',
            'Apple iPhone 14 Pro',
            'Apple iPhone 14 Plus',
            'Samsung Galaxy S23 Ultra',
            'Samsung Galaxy S23+',
            'Samsung Galaxy Z Flip4',
            'Google Pixel 7',
            'Apple iPhone 14',
            'Samsung Galaxy S22',
            'Samsung Galaxy S23',
        ]
    }
    const tr_model = document.createElement("tr");

    const td_space = document.createElement("td");
    td_space.innerHTML = "";
    td_space.setAttribute("colspan", "2");
    tr_model.appendChild(td_space);

    model_filter.forEach(model => {
        const td = document.createElement("td");
        td.innerHTML = model;
        td.style.backgroundColor = model.includes("Google") ? "rgb(216, 215, 216)" : 'rgb(162, 189, 247)';
        tr_model.appendChild(td);
    });
    table.appendChild(tr_model);


    const plan_length = retail.deutsch.A_plan_type.length;
    const data_length = retail.deutsch.B_data_type.length;
    const promo_length = retail.deutsch.C_promo_type.length;

    for (let i = 0; i <= plan_length; i++) {
        const plan_data = retail.deutsch.A_plan_type[i];

        for (let j = 0; j < data_length; j++) {
            const data_type = retail.deutsch.B_data_type[j];

            for (let k = 0; k < promo_length; k++) {
                const tr_master = document.createElement("tr");
                const promo_type = retail.deutsch.C_promo_type[k];

                // if ((i == 0 || i == 1) && j == 0 && k == 0) {
                //     const td = document.createElement("td");
                //     td.innerHTML = plan_data;
                //     td.setAttribute("rowspan", promo_length * 2);
                //     tr_master.appendChild(td);
                // }

                if (i == 0 && (j == 0 || j == 1) && k == 0) {
                    const td2 = document.createElement("td");
                    td2.innerHTML = data_type;
                    td2.setAttribute("rowspan", promo_length);
                    tr_master.appendChild(td2);
                }

                const td_master = document.createElement("td");
                td_master.innerHTML = promo_type;
                tr_master.appendChild(td_master);
                table.appendChild(tr_master);

                for (let k = 0; k < model_filter.length; k++) {
                    const filter = deutsch_de_data
                        .filter(row =>
                            // row[2].trim() == plan_data &&
                            row[3].trim() == data_type &&
                            row[4].trim() == promo_type &&
                            row[5].trim() == model_filter[k]
                        );
                    const td = document.createElement("td");
                    if (filter.length == 0) {
                        td.innerHTML = "-";
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: ['0', '0', plan_data, data_type, promo_type, model_filter[k], '0'],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    else {
                        td.innerHTML = filter[0][6] == 0 ? "-" : filter[0][6];
                        td.style.backgroundColor = colors({
                            google_model: google_filter_data,
                            compare_model: filter[0],
                            plan_type: plan_data,
                            data_type: data_type,
                            promo_type: promo_type
                        });
                    }
                    tr_master.appendChild(td);
                    table.appendChild(tr_master);
                }
            }
        }
    }
}

function colors({ google_model, compare_model, plan_type, data_type, promo_type }) {
    if (compare_model[5].includes("Google")) return 'rgb(216, 215, 216)'; // grey

    const pixel_7_pro = [
        'Google Pixel 7 Pro', 'Apple iPhone 14 Pro', 'Apple iPhone 14 Plus',
        'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S23+', 'Samsung Galaxy Z Flip4'];
    const pixel_7 = [
        'Google Pixel 7', 'Apple iPhone 14',
        'Samsung Galaxy S22', 'Samsung Galaxy S23'];

    const pixel_7a = ['Apple iPhone SE3', 'Samsung Galaxy A54', 'Samsung Galaxy A34',];
    const filter = google_model.filter(row =>
        // row[2].trim() === plan_type &&
        row[3].trim() === data_type &&
        row[4].trim() === promo_type
    );
    let d = 0;
    let model_in_google = [...new Set(google_model.map(row => row[5]))];
    if (filter.length != 0) {
        if (pixel_7_pro.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7 Pro')) {
            d = filter[0][6];
        } else if (pixel_7.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7')) {
            d = filter[1][6];
        } else if (pixel_7a.includes(compare_model[5]) && model_in_google.includes('Google Pixel 7a')) {
            d = filter[2][6];
        }
    } else {
        d = 0;
    }

    compare_model[6] = parseFloat(compare_model[6].toString().split(" ")[0]);
    d = parseFloat(d.toString().split(" ")[0]);

    if (compare_model[6] > d) return 'rgb(246, 207, 203)'; //red
    else if (compare_model[6] < d) return 'rgb(215, 230, 210)'; //green
    else if (d == 0 && compare_model[6] == 0) return 'rgb(250, 242, 199)'; //yellow
    else if (d != 0 && d == compare_model[6]) return 'rgb(250, 242, 199)'; //yellow
}