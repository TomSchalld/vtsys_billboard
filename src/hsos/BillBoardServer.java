package hsos;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import sun.misc.IOUtils;
import sun.security.x509.IssuerAlternativeNameExtension;

/**
 *
 * @author heikerli
 */

public class BillBoardServer extends HttpServlet {
    private final BillBoard bb = new BillBoard ("BillBoardServer");
    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	System.out.println("DOGET");
        String caller_ip = request.getRemoteAddr();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String table = bb.readContents(caller_ip);
        try {
            out.println(table);
        } finally {
            out.close();
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // TODO implementation of doPost()!
    	System.out.println("DoPost success");
    	bb.createEntry(request.getParameter("text"), request.getRemoteAddr());
    	System.out.println("DoPost success");
    }

    /**
     * Handles the HTTP <code>DELETE</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // TODO implementation of doPost()!
    	System.out.println("DELETE");
    	String s = "";
    	BufferedReader in = new BufferedReader(new InputStreamReader(request.getInputStream()));
    	for (String buffer;(buffer = in.readLine()) != null;s+=buffer + "\n");
    	String [] splitter = s.split("=");
    	System.out.println("delete id: "+splitter[1]);

    	bb.deleteEntry(Integer.parseInt(splitter[1].trim()));
    }
    
    /**
     * Handles the HTTP <code>PUT</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // TODO implementation of doPost()!
    	System.out.println("UPDATE");
    	String s = "";
    	BufferedReader in = new BufferedReader(new InputStreamReader(request.getInputStream()));
    	for (String buffer;(buffer = in.readLine()) != null;s+=buffer + "\n");
    	String []splitter = s.split("=|&");
    	bb.updateEntry(Integer.parseInt(splitter[1].trim()), splitter[3], request.getRemoteAddr());
    	System.out.println("update id: "+splitter[1]);
    	System.out.println("update text: "+splitter[3]);

    }
    
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
