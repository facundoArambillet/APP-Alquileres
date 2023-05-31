//React-pdf no trabaja con elementos HTML sino que con elementos PRIMITIVOS por eso tengo que cambiar
// divs por views , parrafos,etc por texts e img por image 
import { Circle, Document, Font, Page, Text, View } from "@react-pdf/renderer"
export default function DetailInvoiceDownload(invoice) {
    const dataInvoice = invoice.invoice

    //Registro la fuente que voy a usar
    Font.register({ family: "Times New Roman", src: "https://www.fonts.com/font/monotype/times-new-roman" })
    return (
        <>
            <Document>
                <Page size={"A4"} style={{ fontFamily: "Times-Roman" }}>
                    <View style={{
                        marginTop: "5%",
                        marginLeft: "3%",
                        marginRight: "3%"
                    }}>
                        {/* ENCABEZADO DE LA FACTURA */}
                        <View style={{ border: "2px black solid", }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "center",
                                marginTop: "2%"
                            }}>
                                <View style={{ marginBottom: "5%" }}>
                                    <Text style={{
                                        color: "black",
                                        fontSize: "22px"
                                    }}>ORIGINAL</Text>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "space-between",
                                margin: "0 5%",
                                fontSize: "14px"
                            }}>
                                <View style={{ marginBottom: "2%" }}>
                                    <Text style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4%" }}>Facundo Arambillet</Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>Telefono: </Text>
                                        <Text>2983520173</Text>
                                    </Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>Localidad: </Text>
                                        {dataInvoice.tenant.property.city}
                                    </Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>CBU: </Text>
                                        <Text>0140361703635850607450</Text>
                                    </Text>
                                </View>
                                <View style={{ marginBottom: "2%" }}>
                                    <Text style={{ marginBottom: "4%" }}>Datos Facturacion</Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>Nº: </Text>
                                        <Text>{dataInvoice.idInvoice}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>Fecha: </Text>
                                        <Text>{dataInvoice.date.split("T")[0]}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>Cuit/Cuil: </Text>
                                        <Text>20415539593</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* CUERPO DE LA FACTURA */}
                        <View style={{ marginTop: "3%", padding: "1%" }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginLeft: "2%"
                                }}>

                                <Text style={{ color: "black", fontSize: "14px" }}>PARA: </Text>
                                <Text style={{
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}>
                                    {dataInvoice.tenant.lastName}, {dataInvoice.tenant.name}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: "2%",
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "900",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingLeft: "2%",
                                paddingRight: "2%"
                            }}>

                                <Text>ALQUILER: </Text>
                                <Text style={{ fontSize: "12px" }}>$ {dataInvoice.tenant.property.rentPrice}</Text>
                            </View>
                            <Text style={{ borderBottom: "1px solid #9B9B9B", marginTop: "1%" }}></Text>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "center",
                                marginTop: "2%"
                            }}>
                                <Text style={{
                                    color: "black",
                                    borderBottom: "1px solid black",
                                    fontSize: "20px"
                                }}>
                                    {/* SPLITEO EL NOMBRE DE LA EXPENSA SUPONIENDO QUE DE 2DO PARAMETRO SIEMPRE VA A IR EL MES 
                                    PARA PODER CREAR EXPENSAS DIFERENTES DE DEPTO Y CASA CON DIFERENTES NOMBRES */}
                                    {`EXPENSAS DE ${dataInvoice.expense.name.split(" ")[1].toUpperCase()}`}
                                </Text>
                            </View>
                            {dataInvoice.expense.utilities.map(utility => (
                                <View style={{
                                    marginTop: "2%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingLeft: "2%",
                                    paddingRight: "2%"
                                }} key={utility.idUtility}>

                                    <Text style={{ fontSize: "14px", color: "black" }}>{utility.utilityType.type}: </Text>
                                    <Text style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}>$ {utility.price}</Text>

                                </View>
                            ))}
                            {/* DESCOMENTAR SI SE AGREGA ALGO MAS PARA QUIEN TENGA EXPENSAS EN 0 */}
                            {/* {dataInvoice.tenant.property.percentageExpenses !== 0 ?
                                <View style={{
                                    border: "2px solid #505E61",
                                    marginTop: "5%",
                                    color: "#505E61"
                                }}>
                                    <Text style={{
                                        margin: "3%",
                                        paddingLeft: "2%",
                                        fontSize: "14px"
                                    }}>
                                        <Text>Porcentaje de Exp:    </Text>
                                        <Text style={{ color: "black", fontWeight: "bold" }}>{dataInvoice.tenant.property.percentageExpenses}</Text>
                                        <Text>   %</Text>
                                    </Text>
                                </View>
                                : (
                                    <Text></Text>
                                )
                            } */}

                            <View style={{
                                border: "2px solid black",
                                marginTop: "0.5%",
                                color: "black",
                                marginTop: "5%"
                            }}>
                                <View style={{
                                    margin: "3%",
                                    fontSize: "14px"
                                }}>

                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}>
                                        <Text>IMPORTE TOTAL:</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: "12px" }}>$ {dataInvoice.total}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{
                                border: "2px solid black",
                                marginTop: "0.5%",
                                color: "black"
                            }}>
                                <View style={{
                                    margin: "3%",
                                    fontSize: "14px"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}>
                                        <Text>Porcentaje de Exp:</Text>
                                        <Text style={{ color: "black", fontWeight: "bold" }}>{dataInvoice.tenant.property.percentageExpenses} %</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* PIE DE PAGINA */}
                    <View style={{
                        marginTop: "50%",
                        marginLeft: "5%",
                        marginRight: "5%",
                        borderTop: "1px solid #505E61",
                        fontSize: "10px",
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingLeft: "2%",
                            paddingRight: "2%"
                        }}>
                            <Text>
                                {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </Text>
                            <Text>Page 1 of 1</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    )
}